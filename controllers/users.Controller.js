//const database = dbClient.db('DWFS_P6');
const {response,request} = require('express');
const UserModel = require('../models/user.Model');

// Sample routes for testing
// Se coloca el req = request para que el compilador identifique el tipo de dato, y se visualice el autocompletado
const userGet = (async (req = request,res = response) => {
	try {
		const users = await UserModel.find();
	res.status(200).json({
		message:"Datos cargados correctamente",
		data: users
	});
	//Alternative Test simple response
	//res.send('Function to get all users');
		
	} catch (error) {		
		console.error("Error interno obteniendo usuarios", error.message);
		res.status(500).send({ message: "Error interno del servidor" });		
	}
	const users = await UserModel.find();
	res.status(200).json({
		message:"Datos cargados correctamente",
		data: users
	});
	//Alternative Test simple response
	//res.send('Function to get all users');
});

const userGetById = (async (req = request,res = response) => {
	
	try {
		const{id} = req.query;
		if (id == null || id == "") {
			res.status(400).json({
				message:"ID de usuario requerido"
			});
		}
		else{
			const user = await UserModel.findById(id);
			if (user != null) {
				console.log(user);
				res.status(200).json({
					message:"Usuario encontrado",
					data: user
				});
			} else {
				return res.status(409).send({ message: "Usuario no encontrado" });
				
			}
		}
	} catch (error) {
		console.error("Error interno buscando el usuario:", error.message);
		res.status(500).send({ message: "Error interno del servidor buscando el usuario" });
	}
	
	//Alternative Test simple response
	//res.send('Function to get a single user');
});

const userCreate = (async (req = request,res = response) => {
	const {Username,Password,Name,Lastname,Email,Enabled}= req.body;

	try {
		 // Check if username already exists in the database
		 const existingUser = await UserModel.findOne({ Username: Username });

		 if (existingUser) {
		   // Username conflict (409 Conflict)
		   return res.status(409).send({ message: "Nombre de usuario ya existe" });
		 }
		 // Check if Email already exists in the database
		 const existingEmail = await UserModel.findOne({ Email: Email});

		 if (existingEmail) {
		   // Username conflict (409 Conflict)
		   return res.status(409).send({ message: "Correo ya registrado" });
		 }
		 
    	// Username doesn't exist, proceed with user creation
		let user = new UserModel({Username,Password,Name,Lastname,Email,Enabled});
		const createdUser = await user.save();
		res.status(200).json({
			message:"Usuario creado correctamente",
			data: createdUser
		});
	} 
	catch (error) {
		console.error("Error interno creando el usuario:", error.message);
		res.status(500).send({ message: "Error interno del servidor" });
	}
});

const userUpdate = (async (req = request,res = response) => {
	// envio de datos a través de query o Params:
	//query = ?id=123456 - cuando es opcional
	//params = /:id - cuando es obligatorio
	try {
		
		const{id} = req.query;
		if (id == null || id == "") {
			res.status(400).json({
				message:"ID de usuario requerido"
			});
		}
		else{
			
		
		 // Check if username exists in the database
		 const existingUser = await UserModel.findOne({ Username: req.body.username });
		
		 
		// Username exists, proceed with user update
		 if (existingUser) {
			const {Username,Password,Name,Lastname,Email,Enabled}= req.body;
			let _user = new UserModel({_id:id,Username,Password,Name,Lastname,Email,Enabled});
			const updatedUser = await UserModel.findByIdAndUpdate(id,_user,{new:true});
			res.status(200).json({
				message:"Usuario actualizado correctamente",
				data: updatedUser
			});
		 }
		 else{
			return res.status(409).send({ message: "Usuario no existe" });
		 }

		}
		//Alternative Test simple response
		//res.send('Function to update users');
	} catch (error) {
		console.error("Error interno actualizando el usuario:", error.message);
		res.status(500).send({ message: "Error interno del servidor" });
	}
		
});

const userDelete = (async (req = request,res = response) => {
	try {
		const{id} = req.query;
		if (id == null || id == "") {
			res.status(400).json({
				message:"ID de usuario requerido"
			});
		}
		else{
		const updatedUser = await UserModel.findByIdAndDelete(id,null,{new:true});
		res.status(200).json({
			message:"Usuario eliminado correctamente",
			data: updatedUser
		});
		}
	} catch (error) {
		console.error("Error interno actualizando el usuario:", error.message);
		res.status(500).send({ message: "Error interno del servidor" });
	}

});

module.exports = {
	userGet,
	userGetById,
	userCreate,
	userUpdate,
	userDelete
};
