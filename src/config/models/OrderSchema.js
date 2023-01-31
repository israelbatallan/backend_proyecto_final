const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    orderNumber:{type:Number},
    date:{type:String, require:true},
    state: {type: String, default: "generada"},
    email:{type:String, require:true},
    products:{type:Array, require:true},
    adress: {type:String, require: true},
    totalPrice:{type:Number, require: true}
});

module.exports = OrderSchema;