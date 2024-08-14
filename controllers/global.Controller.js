const {response,request} = require('express');
const mongoose = require('mongoose');

// Sample routes for testing

const ConnTest = (async (req = request,res = response) =>{
	let DBConn, status;
	try {	
		DBConn = mongoose.connection.readyState; // 0 = Disconnected, 1= Connected, 2= Connecting, 3= Disconnecting
		console.log(DBConn);
		switch (DBConn) {
			case 0:
				status = "DB Not connected"
				break;
			case 1:
				status = "DB Conection OK"
				break;	
			case 2:
				status = "DB Connecting... "
				break;			
			case 3:
				status = "DB Disconnecting... "
				break;
			default:
				break;
		}
		res.status(200).send({message: `API Connected, DB Status: ${status}`});
		console.log( `Connection Test: API Connected, DB Status: ${status}`);
	} catch (error) {
		res.status(500).send({ message: "Error interno del servidor" });	
	}
	
} )

module.exports = {
    ConnTest
}