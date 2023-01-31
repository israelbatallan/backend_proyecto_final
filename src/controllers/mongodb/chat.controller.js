const Router = require("express").Router;
const routerChat = Router();

const {
    ifTokenExisteNext,
    verifyTokenJWT,
} = require("../../middlewares/auth-strategies");
const {
    getAllMessages,
    getMessagesByEmail,
    postNewMessage,
} = require("../../services/chat-services");

routerChat.get("/", ifTokenExisteNext, verifyTokenJWT, getAllMessages);

routerChat.get("/:email", ifTokenExisteNext, verifyTokenJWT, getMessagesByEmail);

routerChat.post("/", ifTokenExisteNext, verifyTokenJWT, postNewMessage);

module.exports = routerChat;
