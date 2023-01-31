const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    age: { type: Number, required: true },
    adress: { type: String, required: true },
    phone: { type: String, required: true },
    thumbnail: { type: String },
    cart: { type: Array },
    admin: { type: Boolean },
});

module.exports = UsuarioSchema;