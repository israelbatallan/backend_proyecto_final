const MongoClassContainer = require("../../containers/MongoClassContainer");
const OrderSchema = require("../../config/models/OrderSchema");

const mongoose = require("mongoose");

let instance;

class MongoDaoOrders extends MongoClassContainer {
    constructor() {
        super("orders", OrderSchema);
    }

    static getInstance() {
        if (instance === undefined) return (instance = new MongoDaoOrders());
    }

    createOrder = async (element) => {
        try {
            const orders = await this.getAll();
            const order = {
                orderNumber: orders.length === 0 ? 1 : orders.length +1,
                date: new Date().toDateString(),
                products: element.productos,
                email: element.email,
                adress: element.adress,
                totalPrice: element.totalPrice,
                products: element.products,
            };
            const newElement = new this.collection(order);
            const result = await newElement.save();
            return result;
        } catch (error) {
            throw new Error("Error", error);
        }
    };
};

module.exports = MongoDaoOrders;