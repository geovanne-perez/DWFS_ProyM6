//const database = dbClient.db('DWFS_P6');
const {response,request} = require('express');

// Sample routes for testing
const userGet = ((req,res) => {res.send('Function to get all users');});

const userGetById = ((req,res) => {res.send('Function to get a single user');});

const userCreate = ((req,res) => {res.send('Function to create users');});

const userUpdate = ((req,res) => {res.send('Function to update users');});

const userDelete = ((req,res) => {res.send('Function to delete users permanently');});

module.exports = {
	userGet,
	userGetById,
	userCreate,
	userUpdate,
	userDelete
}

/*
// Obtener todos los usuarios
const userGet = async () => {
	let users;
	const dbClient = new MongoClient(process.env.URL_BD);
	try {
		
		const coll = database.collection(collection);
		const cursor = coll.find({});
		users = await cursor.toArray();
	} catch (error) {
		console.error(error);
	} finally {
		await dbClient.close();
	}
	return users;
};
// Obtener un usuario por ID 
const userGetById = async (id) => {
	let user;
	const filter = { '_id': ObjectId(id) };
	const client = new MongoClient(process.env.URL_BD);
	try {
		const coll = database.collection(collection);
		const cursor = coll.find(filter);
		user = await cursor.toArray()
	} catch (error) {
		console.error(error);
	} finally {
		await client.close();
	}
	return user;
};
// Insertar un Usuario
const userCreate = async (user) => {
	const client = new MongoClient(process.env.URL_BD);
	try {
		await database.collection(collection).insertOne(user);
	} catch (error) {
		console.error(error);
	} finally {
		client.close();
	}
};
// Actualizar un usuario
const userUpdate = async (id, user) => {
	const query = { _id: new mongodb.ObjectID(id) };   
	const update = { $set: user };
	const client = new MongoClient(process.env.URL_BD);
	try {
		database.collection(collection).updateOne(query, update, function(err, result);
		user = result;
	} catch (error) {
		console.error(error);
	} finally {
		await client.close();
	}
	return user;
};
//Eliminar un usuario por ID
const userDelete = async (id) => {
	const filter = { "_id": ObjectId(id) }
	const client = new MongoClient(process.env.URL_BD);
	try {
		await database.collection(collection).deleteOne(filter);
	} catch (error) {
		console.error(error);
	} finally {
		await client.close();
	}
};

*/