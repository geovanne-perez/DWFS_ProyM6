const {Schema,model} = require("mongoose");

const userSchema = Schema({
    Username: {
        type: String,
        required:true [true,'El user es obligatorio'],
        unique: true,
    },
    Password: {
      type: String,
      required: true  [true,'La contraseña es obligatoria'],
    },
    Name: {
      type: String,
      default: "",
    },
    Lastname: {
      type: String,
      default: "",
    },
    Email: {
      type: String,
      unique: true,
    },
    Enabled: {
        type: Boolean,
        default: true,
    }
}, {versionKey:false});

const User = model("User", userSchema);

module.exports = User;
