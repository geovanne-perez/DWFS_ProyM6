const mongoose = require('mongoose');

const dbConnection = async () => {
try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Conexión a base de datos realizada con éxito");
} catch (error) {
    console.log(error);
    throw new Error("Error abriendo conexión con MongoDB")
}
}

module.exports = {
    dbConnection
};