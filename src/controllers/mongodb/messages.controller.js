
const Router = require("express").Router;
const routerMensajes = Router();

const { ifTokenExisteNext, verifyTokenJWT, isAdmin } = require("../../middlewares/auth-strategies");
const {
    getAllMessages,
    getMessagesById,
    deleteMessageById,
    postNewMessage
} = require("../../services/messages-services");


routerMensajes.get("/", ifTokenExisteNext, verifyTokenJWT, getAllMessages);

routerMensajes
.route("/:id?")
.get( ifTokenExisteNext, verifyTokenJWT, getMessagesById)
.delete(  ifTokenExisteNext, verifyTokenJWT, isAdmin, deleteMessageById);

routerMensajes.post("/", ifTokenExisteNext, verifyTokenJWT, postNewMessage);


module.exports = routerMensajes;