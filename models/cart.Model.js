const {Schema,model} = require("mongoose");

const userSchema = Schema({
    Username: {
        type: String,
        required: true [true,'El user es obligatorio'],
        unique: true,
    }
}, {versionKey:false});

const User = model("Cart", userSchema);

module.exports = User;
