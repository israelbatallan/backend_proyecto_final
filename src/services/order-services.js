const { ordersDao, cartDao,} = require("../Daos/index");
const { logger, loggerError } = require("../logs/winston");
const { sendMailUserOrderToUser, sendMailUserOrderToSite } = require("../utils/nodemailer");
const { objetcToPOJO } = require("../utils/toPojo");

const getOrders = async (req, res) => {
    const orders = await ordersDao.getAll();
    orders.length > 0 
    ? res.status(200).send(orders) 
    : res.status(200).json({message: "No hay ordenes en la DB"})
};

const getOrderById = async (req, res) => {
    const {id} = req.params;
    const orderById =await ordersDao.getById(id)
    orderById !== null 
    ? res.status(200).send(orderById) 
    : res.status(200).json({message: `No exite la orden con el ID: ${id} en la DB`})
};

const postCreateOrder = async (req, res) => {
    const { email } = req.user;
    const cartByEmail = await cartDao.getByEmail(email);
    const userCart = objetcToPOJO(cartByEmail);
    const totalByProd = userCart.productos.map((el) => el.precio * el.cantidad);
    const totalPrice = totalByProd.reduce((a, b) => a + b, 0);

    const newOrder = {
        email: email,
        adress: userCart.adress,
        products: userCart.productos,
        totalPrice: totalPrice,
    };
    if (totalPrice === 0){
        return res
            .status(200)
            .json({ message: "Order not generate, the cart is empty"
        });
    }
    else {
        const order = await ordersDao.createOrder(newOrder);
        await cartDao.deleteAllProductsInCart(cartByEmail[0]._id);
        sendMailUserOrderToSite(order);
        sendMailUserOrderToUser(order);
        await cartDao.deleteAllProductsInCart(cartByEmail[0]._id);
        return res.redirect(`/orders/${order._id}`)
    }
};

const deleteOrderById = async (req, res) => {
    const {id} = req.params;
    const orderId = await ordersDao.getById(id);
    if(orderId !==null) {
        await ordersDao.deleteById(id);
        return res.status(201).send(`Order ID: ${id} deleted`);
    } else {
        loggerError .log({
            level: "error",
            message: `Error Metodo: ${req.method} Order ID: ${id} no existe`,
        });
        return res.status(404).json(`ERROR Order ID:${id} no encontrado`);
    }
};

module.exports = {
    getOrders,
    getOrderById,
    postCreateOrder,
    deleteOrderById
}