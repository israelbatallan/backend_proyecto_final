const MongoClassContainer = require("../../containers/MongoClassContainer");
const ProductSchema = require("../../config/models/ProductSchema");

const mongoose = require("mongoose");

let instance;

class MongoDaoProducts extends MongoClassContainer {
    constructor() {
        super('products', ProductSchema)
    }

    static getInstance() {
        if (instance === undefined) return instance = new MongoDaoProducts();
    };

    save = async (element) => {
        try {
            element.timestamp = new Date().toISOString();
            element.codigo = Date.now();
            const newElement = new this.collection(element);
            const result = await newElement.save();
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

    filterByCategory = async (categoria) => {
        try {
            if (mongoose.Types.ObjectId.isValid(categoria)) return null;
            else{
            const result = await this.collection.find({categoria});
            return result;
            }
        } catch (error) {
            throw new Error(error);
        }
    };
}

module.exports = MongoDaoProducts;