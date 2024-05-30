const {Schema,model} = require("mongoose");

const userSchema = Schema({
    userId: {
        type: String,
        required: true
    },
    carId:{
        type: String,
        required: true
    },
    active:{
        type: Boolean
    },
    closed:{
        type: Boolean
    }
}, {versionKey:false});

const Cart = model("Cart", userSchema);

module.exports = Cart;