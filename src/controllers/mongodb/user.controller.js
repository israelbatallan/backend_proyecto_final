const Router = require("express").Router;
const routerUser = Router();


const { ifTokenExisteNext, verifyTokenJWT } = require("../../middlewares/auth-strategies");
const {
    getUser,
    getUserData,
    getUserCart,
    getUserOrder,
} = require("../../services/user-services");


routerUser.get('/user', ifTokenExisteNext, verifyTokenJWT, getUser);

routerUser.get('/user/data', ifTokenExisteNext, verifyTokenJWT, getUserData);

routerUser.get('/user/carrito', ifTokenExisteNext, verifyTokenJWT, getUserCart);


module.exports = routerUser;