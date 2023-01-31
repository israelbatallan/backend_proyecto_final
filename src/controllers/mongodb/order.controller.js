const Router = require("express").Router;
const routerOrder = Router();

const { verifyTokenJWT, ifTokenExisteNext, isAdmin } = require("../../middlewares/auth-strategies");

const { getOrders, getOrderById, postCreateOrder, deleteOrderById } = require("../../services/order-services");

routerOrder.get("/", ifTokenExisteNext, verifyTokenJWT, isAdmin, getOrders);

routerOrder.get('/:id?', ifTokenExisteNext, verifyTokenJWT, getOrderById)

routerOrder.post('/', ifTokenExisteNext,verifyTokenJWT, postCreateOrder);

routerOrder.delete('/:id', ifTokenExisteNext, verifyTokenJWT, isAdmin, deleteOrderById);


module.exports = routerOrder;