
// Obtener todos los usuarios
exports.getUsers = async () => {
	let users;
	const dbClient = new MongoClient(process.env.URL_BD);
	try {
		const database = dbClient.db('db_persons');
		const coll = database.collection('persons');
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
		await client.db('db_persons').collection('users').insertOne(user);
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
		const coll = client.db('db_persons').collection('users');
		const cursor = coll.find(filter);
		user = await cursor.toArray()
	} catch (error) {
		console.error(error);
	} finally {
		await client.close();
	}
	return user;
};

// Guardar un usuario
exports.updateUser = async (id, user) => {
	const query = { _id: new mongodb.ObjectID(id) };   
	const update = { $set: user };
	const client = new MongoClient(process.env.URL_BD);
	try {
		client.db('db_persons').
			collection('users').
			updateOne(query, update, function(err, result);
		user = result;
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
		await client.db("db_persons").collection("persons").deleteOne(filter);
	} catch (error) {
		console.error(error);
	} finally {
		await client.close();
	}
};