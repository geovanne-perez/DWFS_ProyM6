const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    user: {
        type: String,
        required:true,
        unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: "",
    },
    lastname: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      unique: true,
    },
    controlNo: {
      type: Number,
      default: 0,
    },
    enabled: {
        type: Boolean,
        default: true,
    }
});


const User = mongoose.model("User", userSchema);

module.exports = User;
