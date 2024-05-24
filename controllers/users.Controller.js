//const database = dbClient.db('DWFS_P6');
const {response,request} = require('express');
const UserModel = require('../models/user.Model');

// Sample routes for testing
// Se coloca el req = request para que el compilador identifique el tipo de dato, y se visualice el autocompletado
const userGet = (async (req = request,res = response) => {
	const users = await UserModel.find();
	res.status(200).json({
		message:"Datos cargados correctamente",
		data: users
	});
	//Alternative Test simple response
	//res.send('Function to get all users');
});

const userGetById = (async (req = request,res = response) => {
	
	const{id} = req.query;
	const user = await UserModel.findById(id);
	if (user != null) {
		res.status(200).json({
			message:"Usuario cargado correctamente",
			data: user
		});
	}
	else{
		res.status(400).json({
			message:"Usuario no encontrado",
			data: user
		});
	}
	
	//Alternative Test simple response
	//res.send('Function to get a single user');
});

const userCreate = (async (req = request,res = response) => {
	const body = req.body;
	let user = new UserModel(body);
	await user.save();
	console.log("El buddy es: ",body);
	res.send('Function to create users');
});

const userUpdate = (async (req = request,res = response) => {
	// envio de datos a través de query o Params:
	//query = ?id=123456 - cuando es opcional
	//params = /:id - cuando es obligatorio
	const{id} = req.query;
	const updatedUser = await UserModel.findByIdAndUpdate(id,req.body,{new:true});
	res.status(200).json({
		message:"Usuario actualizado correctamente",
		data: updatedUser
	});

	//Alternative Test simple response
	//res.send('Function to update users');
});

const userDelete = (async (req = request,res = response) => {
	
	const{id} = req.query;
	const updatedUser = await UserModel.findByIdAndDelete(id,req.body,{new:true});
	res.status(200).json({
		message:"Usuario eliminado correctamente",
		data: updatedUser
	});

	//Alternative Test simple response
	//	res.send('Function to delete users permanently');
});

module.exports = {
	userGet,
	userGetById,
	userCreate,
	userUpdate,
	userDelete
};
