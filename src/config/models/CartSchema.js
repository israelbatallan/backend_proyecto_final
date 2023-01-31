const mongoose = require("mongoose");

const CartShchema = new mongoose.Schema({
    id: { type: Number, required: true },
    timestamp: { type: Number },
    productos: { type: Array },
    email: {type: String, require: true},
    date: {type: String, require: true},
    adress: {type: String, require: true}
});

module.exports = CartShchema;