const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema({
    email: {type: String},
    type: {type: String},
    date: {type: String},
    text: {type: String}
});


module.exports = MessagesSchema;