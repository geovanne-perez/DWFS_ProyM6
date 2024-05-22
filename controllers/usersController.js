const database = dbClient.db('DWFS_P6');
const collection = 'users';

// Obtener todos los usuarios
exports.getUsers = async () => {
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

// Insertar un Usuario
exports.addUser = async (user) => {
	const client = new MongoClient(process.env.URL_BD);
	try {
		await database.collection(collection).insertOne(user);
	} catch (error) {
		console.error(error);
	} finally {
		client.close();
	}
};

// Obtener un usuario por ID 
exports.getUserById = async (id) => {
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

// Actualizar un usuario

exports.updateUser = async (id, user) => {
	const query = { _id: new mongodb.ObjectID(id) };   
	const update = { $set: user };
	const client = new MongoClient(process.env.URL_BD);
	try {
		/*
		database.collection(collection).updateOne(query, update, function(err, result);
		user = result;
		*/
	} catch (error) {
		console.error(error);
	} finally {
		await client.close();
	}
	return user;
};


//Eliminar un usuario por ID
exports.delUser = async (id) => {
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