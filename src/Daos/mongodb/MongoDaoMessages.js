const MongoClassContainer = require("../../containers/MongoClassContainer");
const MessagesSchema = require("../../config/models/MessagesSchema");

let instance;

class MongoDaoMessages extends MongoClassContainer {
    constructor() {
        super('mensajes', MessagesSchema)
    }

    static getInstance() {
        if (instance === undefined) return instance = new MongoDaoMessages();
    };

    async save(msj) {
        try {
            const _mensajes = await this.getAll();
            const msj = this.collection(_mensajes)
            const result = await newElement.save(msj);
            return result;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getByEmail(email) {
        try {
            const result = await this.collection.find({email}).where({"author.email": email});
            return result;
        } catch (error) {
            throw new Error(error);
        }
    };

}

module.exports = MongoDaoMessages;