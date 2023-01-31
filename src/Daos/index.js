require("dotenv").config()

const yargArgs = require("../utils/yarg-cli")

let productos
let carritos
let usuarios
let mensajes
let orders

switch (yargArgs.DB_HOST || process.env.DB_HOST) {
	case "mongodb":
		const MongoDaoCarts = require("./mongodb/MongoDaoCarts");
		const MongoDaoProducts = require("./mongodb/MongoDaoProducts");
		const MongoDaoUsers = require("./mongodb/MongoDaoUsers");
		const MongoDaoMessages = require("./mongodb/MongoDaoMessages");
		const MongoDaoOrders = require("./mongodb/MongoDaoOrders")

		carritos = MongoDaoCarts.getInstance();
		productos = MongoDaoProducts.getInstance();
		usuarios = MongoDaoUsers.getInstance();
		mensajes = MongoDaoMessages.getInstance();
		orders = MongoDaoOrders.getInstance();
		break;

	default:
		throw new Error("No se ha definido una conexión a la base de datos");
		break;
}

const productsDao = productos;
const cartDao = carritos;
const userDao = usuarios;
const messageDao = mensajes;
const ordersDao = orders;

module.exports = { productsDao, cartDao, userDao, messageDao, ordersDao };