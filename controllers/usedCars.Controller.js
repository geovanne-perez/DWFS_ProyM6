const {response,request} = require('express');
const usedCarModel = require('../models/usedCar.Model');

// Función para obtener todos los autos usados en catálogo
const usedCarsGet = (async (req = request,res = response) => {
	try {
		const cars = await usedCarModel.find();
		res.status(200).json({
		message:"Datos cargados correctamente",
		data: cars
		});
	} catch (error) {		
		console.error("Error interno obteniendo autos usados", error.message);
		res.status(500).send({ message: "Error interno del servidor. Intente nuevamente" });		
	}
});

// Función para obtener un sólo auto de catálogo
const usedCarsGetById = (async (req=request,res=response) => {
	try {
		const {id} = req.query;
		if (id == null || id == "") {
			res.status(400).json({
				message:`ID de auto requerido`
			});
		};
		
		const cars = await usedCarModel.findById(id);
		if (cars != null) {
			res.status(200).json({
				message:`Auto con ID: ${id} encontrado.`,
				data: cars
			});
		}
		else{
			console.log(`Auto con ID: ${id} no encontrado`);
			res.status(409).json({
				message:`Auto con ID: ${id} no encontrado`
			});
		}

	} catch (error) {
		console.error("Error interno obteniendo auto por ID", error.message);
		res.status(500).send({ message: "Error interno del servidor. Intente nuevamente" });	
	}
});

// Función para crear un nuevo auto en catálogo
const usedCarsInsert = (async (req= request,res=response) =>{
	try {		
		const {marca,modelo,año,kilometraje,precio,color,descripción,img,status} = req.body;
		
		// Validaciones de datos

		// Checar si marca es Null (Error 400)
		if (marca == null || marca == "") {
			return res.status(400).send({ message: "Se requiere introducir la marca" });
		};
		// Checar si el modelo es Null (Error 400)
		if (modelo == null || modelo == "") {
			return res.status(400).send({ message: "Se requiere introducir el modelo" });
		};
		// Checar si el año es Null (Error 400)
		if (año == null || año == 0) {
			return res.status(400).send({ message: "Se requiere introducir el año" });
		};
		// Checar si el kilometraje es Null (Error 400)
		if (kilometraje == null || kilometraje == 0) {
			return res.status(400).send({ message: "Se requiere introducir el kilometraje" });
		};
		// Checar si el precio es Null (Error 400)
		if (precio == null || precio == 0) {
			return res.status(400).send({ message: "Se requiere introducir el precio" });
		};

		// Crear auto		
		let car = new usedCarModel(marca,modelo,año,kilometraje,precio,color,descripción,img,status);
		const insertedCar = await car.save();

		res.status(200).json({
			message:"Alta de auto completada correctamente",
			data: insertedCar
		});

		
	} catch (error) {
		console.log("Error al crear un auto: ", error.message);
		res.status(500).send({message:"Error interno en el servidor. Intente nuevamente"});
	}
});

const usedCarsUpdate = (async (req=request, res=response) => {
	try {
		const {id} = req.query;
		const {marca,modelo,año,kilometraje,precio,color,descripción,img,status} = req.body;
		
		// Validaciones de datos

		// Revisar ID
		if (id == null || id == "") {
			res.status(400).json({ message:`ID de auto requerido` });
		};
		// Checar si marca es Null (Error 400)
		if (marca == null || marca == "") {
			return res.status(409).send({ message: "Se requiere introducir la marca" });
		};
		// Checar si el modelo es Null (Error 400)
		if (modelo == null || modelo == "") {
			return res.status(400).send({ message: "Se requiere introducir el modelo" });
		};
		// Checar si el año es Null (Error 400)
		if (año == null || año == 0) {
			return res.status(400).send({ message: "Se requiere introducir el año" });
		};
		// Checar si el kilometraje es Null (Error 400)
		if (kilometraje == null || kilometraje == 0) {
			return res.status(400).send({ message: "Se requiere introducir el kilometraje" });
		};
		// Checar si el precio es Null (Error 400)
		if (precio == null || precio == 0) {
			return res.status(400).send({ message: "Se requiere introducir el precio" });
		};

		// Encontrar auto existente
		 const auto = await usedCarModel.findById(id);
		 
		// Enviar mensaje si el ID no se encontró
		if (auto == null) {
			console.log(`Vehículo con ID ${id} no encontrado`);
			return res.status(409).send({ message: `Vehículo con ID ${id} no encontrado` });
		}

		// Actualizar auto		
		auto.marca = marca != null ? marca:auto.marca;
		auto.modelo = modelo != null ? modelo:auto.modelo;
		auto.año = año != null ? año:auto.año;
		auto.kilometraje = kilometraje != null ? kilometraje:auto.kilometraje;
		auto.precio = precio != null ? precio:auto.precio;
		auto.color = color != null ? color:auto.color;
		auto.descripción = descripción != null ? descripción:auto.descripción;
		auto.img = img != null ? img:auto.img;
		auto.status = status != null ? status:auto.status;	
		
		const updatedAuto = await usedCarModel.findByIdAndUpdate(id,auto,{new:true});
		
		res.status(200).json({
			message:"Actualización de auto completada correctamente",
			data: updatedAuto
		});

	} catch (error) {
		console.log("Error al actualizar un auto: ", error.message);
		res.status(500).send({message:"Error interno en el servidor. Intente nuevamente"});
	}
});

const usedCarsDelete = (async (req=request, res=response) => {
	try {
		const {id} = req.query;

		// Validaciones de datos 
		// Revisar ID
		if (id == null || id == "") {
			res.status(400).json({ message:`ID de auto requerido` });
		};

		// Encontrar auto existente
		 const auto = await usedCarModel.findById(id);
		 
		// Enviar mensaje si el ID no se encontró
		if (auto == null) {
			console.log(`Vehículo con ID ${id} no encontrado`);
			return res.status(409).send({ message: `Vehículo con ID ${id} no encontrado` });
		}
		
		const deletedAuto = await usedCarModel.findByIdAndDelete(id,null,{new:true});
		
		res.status(200).json({
			message:"Eliminación de auto completada correctamente",
			data: deletedAuto
		});

	} catch (error) {
		console.log("Error al eliminar un auto: ", error.message);
		res.status(500).send({message:"Error interno en el servidor. Intente nuevamente"});
	}
})


module.exports = {
	usedCarsGet,
	usedCarsGetById,
	usedCarsInsert,
	usedCarsUpdate,
	usedCarsDelete
}