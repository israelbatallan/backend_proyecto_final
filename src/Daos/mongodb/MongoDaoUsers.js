const MongoClassContainer = require("../../containers/MongoClassContainer");
const UsuarioSchema = require("../../config/models/UsuarioSchema");

let instance;

class MongoDaoUsers extends MongoClassContainer {
    constructor() {
        super('usuarios', UsuarioSchema)
    }

    static getInstance() {
        if (instance === undefined) return instance = new MongoDaoUsers();
    };

    getByEmail = async (email) => {
        try {
            const emailUser = await this.collection.find({email});
            if(emailUser !==[] && emailUser.length > 0) {
                return emailUser;
            }
            else return null;
        } catch (error) {
            throw new Error(error)
        }
    };
}

module.exports = MongoDaoUsers;