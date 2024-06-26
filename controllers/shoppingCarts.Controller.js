const { response, request } = require("express");
const CartModel = require("../models/shoppingCart.Model");
const CarModel = require("../models/car.Model");
const UserModel = require('../models/user.Model');


// Función para obtener todos los carritos activos de un usuario
const GetActiveCarts = async (req = request, res = response) => {
	try {
	  const { id } = req.query;
		console.log("user id: ",id);
	  // Validar que Id sea válido
	  if (id == null || id == "") {
		res.status(400).json({ message: "ID de carrito requerido" });
	  }
	  
	  const user = await UserModel.findById(id);

	  if (user == null) {
		  console.log(user);
		  res.status(409).json({
			  message:"Usuario no encontrado"
		  });}
  
	  const shoppingCart = await CartModel.find({userId:id,active:true});
  
	  // Enviar mensaje si el ID del auto no se encontró
	  if (shoppingCart == null || shoppingCart == "") {
		console.log(`Carritos encontrados`);
		return res.status(409).send({ 
			message: `No se encontraron carritos de compra del usuario ${user.Username}` 
		});
	  }
	  return res.status(200).send({
		message: `Se encontraron carritos de compra del usuario ${user.Username}`,
		data: shoppingCart,
	  });
	} catch (error) {
	  console.log("Error al buscar carrito", error.message);
	  res
		.status(500)
		.send({ message: "Error interno en el servidor. Intente nuevamente" });
	}
  };
  

// Función para obtener un carrito en específico
const GetCart = async (req = request, res = response) => {
  try {
    const { id } = req.query;

    // Validar que Id sea válido
    if (id == null || id == "") {
      res.status(400).json({ message: "ID de carrito requerido" });
    }

    const shoppingCart = await CartModel.findById(id);

    // Enviar mensaje si el ID del auto no se encontró
    if (shoppingCart == null) {
      console.log(`Carrito de compras con id: ${id} no encontrado`);
      return res
        .status(409)
        .send({ message: `Carrito de compras ${id} no encontrado` });
    }
    return res.status(200).send({
      message: `Carrito de compras ${id} encontrado`,
      data: shoppingCart,
    });
  } catch (error) {
    console.log("Error al buscar carrito", error.message);
    res
      .status(500)
      .send({ message: "Error interno en el servidor. Intente nuevamente" });
  }
};
// Función para agregar un auto al carrito
const AddToCart = async (req = request, res = response) => {
  try {
    const { userId, carId } = req.body;

    // Revisar userId
    if (userId == null || userId == "") {
      res.status(400).json({ message: `ID de usuario requerido` });
    }
    // Revisar carId
    if (carId == null || carId == "") {
      res.status(400).json({ message: `ID de auto requerido` });
    }

    const shoppingCart = new CartModel({
      userId,
      carId,
      active: true,
      closed: false,
    });

    // Actualizar estatus de auto
    // Encontrar auto existente
    const auto = await CarModel.findById(carId);

    // Enviar mensaje si el ID del auto no se encontró
    if (auto == null) {
      console.log(`Vehículo con ID ${carId} no encontrado`);
      return res
        .status(409)
        .send({ message: `Vehículo con ID ${carId} no encontrado` });
    }

    // Enviar mensaje si el auto no tiene status 1 (Disponible)
    if (auto.status != 1) {
      console.log(`Vehículo con ID ${carId} no disponible`);
      return res
        .status(409)
        .send({
          message: `Vehículo con ID ${carId} no disponible para apartado. Verifique nuevamente.`,
        });
    }
    // Actualizar auto
    auto.status = 2;

    const addedCart = await shoppingCart.save();
    const updatedAuto = await CarModel.findByIdAndUpdate(carId, auto, {
      new: true,
    });

    console.log(
      "Estatus de Auto ",
      updatedAuto.id,
      "actualizado a ",
      updatedAuto.status
    );
    res.status(200).json({
      message: "Producto agregado a carrito correctamente",
      data: addedCart,
    });
  } catch (error) {
    console.log("Error al agregar a carrito", error.message);
    res
      .status(500)
      .send({ message: "Error interno en el servidor. Intente nuevamente" });
  }
};

// Función para completar la compra de un auto
const CheckoutCart = async (req = request, res = response) => {
  try {
    const { id } = req.query;
    console.log("Checkout requested for id:", id);

    // Revisar userId
    if (id == null || id == "") {
      res.status(400).json({ message: `ID de carrito requerido` });
    }

    const shoppingCart = await CartModel.findById(id);
    console.log(
      "Carrito de compras encontrado:",
      shoppingCart.id,
      " del usuario: ",
      shoppingCart.userId
    );

    let carId = shoppingCart.carId;
    console.log("Vehículo encontrado en carrito con Id:", carId);

    // Enviar mensaje si el ID del auto no se encontró
    if (shoppingCart == null) {
      console.log(`Carrito de compras con id: ${id} no encontrado`);
      return res
        .status(409)
        .send({ message: `Carrito de compras ${id} no encontrado` });
    }

    // Enviar mensaje si el carrito ya está cerrado
    if (shoppingCart.active == false || shoppingCart.closed == true) {
      console.log(`Carrito de compras con id: ${id} no disponible`);
      return res
        .status(409)
        .send({
          message: `Carrito de compras ${id} no disponible, intente nuevamente`,
        });
    }

    // Actualizar estatus de auto
    // Encontrar auto existente
    const auto = await CarModel.findById(carId);
    console.log("Vehículo encontrado con Id:", auto.id);

    // Enviar mensaje si el ID del auto no se encontró
    if (auto == null) {
      console.log(`Vehículo con ID ${carId} no encontrado`);
      return res
        .status(409)
        .send({ message: `Vehículo con ID ${carId} no encontrado` });
    }

    // Actualizar carrito
    shoppingCart.active = false;
    shoppingCart.closed = true;

    // Actualizar auto
    auto.status = 3;

    const updatedCart = await CartModel.findByIdAndUpdate(id, shoppingCart, {
      new: true,
    });
    const updatedAuto = await CarModel.findByIdAndUpdate(carId, auto, {
      new: true,
    });

    console.log(
      "Estatus de Auto ",
      updatedAuto.id,
      "actualizado a ",
      updatedAuto.status
    );
    res.status(200).json({
      message: "Compra realizada correctamente",
      data: updatedCart,
    });
  } catch (error) {
    console.log("Error al cerrar carrito", error.message);
    res
      .status(500)
      .send({ message: "Error interno en el servidor. Intente nuevamente" });
  }
};

// Función para cancelar la compra de un auto
const CancelCart = async (req = request, res = response) => {
  try {
    const { id } = req.query;
    console.log("Checkout requested for id:", id);

    // Revisar userId
    if (id == null || id == "") {
      res.status(400).json({ message: `ID de carrito requerido` });
    }

    const shoppingCart = await CartModel.findById(id);
    console.log(
      "Carrito de compras encontrado:",
      shoppingCart.id,
      " del usuario: ",
      shoppingCart.userId
    );

    let carId = shoppingCart.carId;
    console.log("Vehículo encontrado en carrito con Id:", carId);

    // Enviar mensaje si el ID del auto no se encontró
    if (shoppingCart == null) {
      console.log(`Carrito de compras con id: ${id} no encontrado`);
      return res
        .status(409)
        .send({ message: `Carrito de compras ${id} no encontrado` });
    }

    // Enviar mensaje si el carrito ya está cerrado
    if (shoppingCart.active == false || shoppingCart.closed == true) {
      console.log(`Carrito de compras con id: ${id} no disponible`);
      return res
        .status(409)
        .send({
          message: `Carrito de compras ${id} no disponible, intente nuevamente`,
        });
    }

    // Actualizar estatus de auto
    // Encontrar auto existente
    const auto = await CarModel.findById(carId);
    console.log("Vehículo encontrado con Id:", auto.id);

    // Enviar mensaje si el ID del auto no se encontró
    if (auto == null) {
      console.log(`Vehículo con ID ${carId} no encontrado`);
      return res
        .status(409)
        .send({ message: `Vehículo con ID ${carId} no encontrado` });
    }

    // Actualizar carrito
    shoppingCart.active = false;
    shoppingCart.closed = false;

    // Actualizar auto
    auto.status = 1;

    const updatedCart = await CartModel.findByIdAndUpdate(id, shoppingCart, {
      new: true,
    });
    const updatedAuto = await CarModel.findByIdAndUpdate(carId, auto, {
      new: true,
    });

    console.log(
      "Estatus de Auto ",
      updatedAuto.id,
      "actualizado a ",
      updatedAuto.status
    );
    res.status(200).json({
      message: `Carrito cancelado correctamente. Auto con id ${updatedAuto.id} disponible nuevamente.`,
      data: updatedCart,
    });
  } catch (error) {
    console.log("Error al cerrar carrito", error.message);
    res
      .status(500)
      .send({ message: "Error interno en el servidor. Intente nuevamente" });
  }
};

module.exports = {
  GetCart,
  GetActiveCarts,
  AddToCart,
  CheckoutCart,
  CancelCart,
};
