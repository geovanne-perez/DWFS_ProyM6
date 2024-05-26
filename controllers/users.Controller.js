//const database = dbClient.db('DWFS_P6');
const {response,request} = require('express');
const UserModel = require('../models/user.Model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Sample routes for testing
// Se coloca el req = request para que el compilador identifique el tipo de dato, y se visualice el autocompletado
const userGet = (async (req = request,res = response) => {
	try {
		const users = await UserModel.find();
		res.status(200).json({
		message:"Datos cargados correctamente",
		data: users
		});
		
	} catch (error) {		
		console.error("Error interno obteniendo usuarios", error.message);
		res.status(500).send({ message: "Error interno del servidor" });		
	}
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

	try {
		
		const {Username,Password,Name,Lastname,Email,Enabled}= req.body;
		let user = new UserModel({Username,Password,Name,Lastname,Email,Enabled});
		
		// Check if Username or Password Empty (400 Conflict)
		if (Username == null || Password == null) {
			return res.status(400).send({ message: "Se requiere Username y Password" });
		}

		 // Check if username already exists in the database
		 const existingUser = await UserModel.findOne({ Username: user.Username});
		 if (existingUser) {
		   // Username conflict (409 Conflict)
		   return res.status(409).send({ message: "Nombre de usuario ya existe" });
		 }

		 // Check if Email already exists in the database
		 const existingEmail = await UserModel.findOne({ Email: user.Email});
		 if (existingEmail) {
		   return res.status(409).send({ message: "Correo ya registrado" });
		 }
		 
    	// Username doesn't exist, proceed with user creation
		//Hash password
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(user.Password,salt);
		user.Password = hashedPassword;
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
			
		 const {Username,Name,Lastname,Email,Enabled}= req.body;
		 let newUser = new UserModel({Username,Password,Name,Lastname,Email,Enabled});

		// Check if Username Empty (400 Conflict)
		if (Username == null) {
			return res.status(400).send({ message: "Se requiere Username y Password" });
		}
		 // Check if username exists in the database
		 var existingUser = await UserModel.findOne({ Username: newUser.username });
		 
		// Username exists, proceed with user update
		 if (existingUser) {
			existingUser = {Username,Name,Lastname,Email,Enabled};
			const updatedUser = await UserModel.findByIdAndUpdate(id,existingUser,{new:true});
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

const login = (async(req = request,res = response) => {
	try {
		const {Username,Password}= req.body;
		let user = new UserModel({Username,Password});

		// Check if Username or Password Empty (400 Conflict)
		if (Username == null || Password == null) {
			return res.status(400).send({ message: "Se requiere Username y Password" });
		}
		
		console.log("User: ",user);
		// Buscar y recuperar usuario
		const foundUser = await UserModel.findOne({Username:user.Username});
		if (!foundUser) {
			return await res.status(400).
				json({msg: "The username does not exist"});
		};
			// Comparar Passwords
			const checkPass = await bcryptjs.compare(user.Password,foundUser.Password)
			
			// Si el pass incorrecto, retornar error 400 (Not Found)
			if (!checkPass) {
				return await res.status(400).
					json({msg: "The username or password does not correspond"});
			}

			// Generar WebToken JWT
			// 1. el 'payload' será un objeto que contendrá el id del usuario
			const payload = { 
				id: foundUser.id,
				username: foundUser.Username,
				name: foundUser.Name
			}
			// 2. firma del jwt
			jwt.sign(
				payload, 
				// usamos la palabra secreta para descifrar la firma electrónica del token
				process.env.SECRET,
				{
					expiresIn: 3600000 // expiración del token
				}, 
				(error, token) => {
					if(error) throw error;
					//si todo va bien, retorna el token
					res.json({token})
			});
		
		
	} catch (error) {
		console.error("Error en login", error.message);
		res.status(500).send({ message: "Error interno del servidor" });
	}

});

module.exports = {
	userGet,
	userGetById,
	userCreate,
	userUpdate,
	userDelete,
	login
};
