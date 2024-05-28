const {Schema,model} = require("mongoose");

const userSchema = Schema({
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    año: {
        type: Number,
        required: true,
        min: 1900
    },
    kilometraje: {
        type: Number,
        required: true,
        min: 0
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    color: {
        type: String
    },
    descripción: {
        type: String
    },
    img: {
        type: [String]
    },
    // Status = 1: En Venta, 2: Apartado, 3: Vendido
    status:{
        type: Number, 
        required: true,
        min: 1,
        max: 3
    }
}, {versionKey:false});

const carModel = model("cars", userSchema);

module.exports = carModel;