const { messageDao } = require("../Daos/index");
const { loggerError } = require("../logs/winston");

const mensajes = messageDao;

const getAllMessages = async (req, res) => {
    const messages = await mensajes.getAll();
    const {admin, email} = req.user;
    const type = req.user.admin;
    type !== true ? userType = "usuario" : userType = "sistema";
    messages !== null && messages.length > 0
    ? res.render('chat', {messages, admin, email, type: userType})
    : res.render('chat', {messages, admin, email, type: userType})
};

const getMessagesByEmail = async (req, res) => {
    const email = req.params.email;
    const mensaje = await mensajes.getByEmail(email);
    const emailUser = req.user.email;
    if (mensaje!== null && mensaje.length > 0) {
        res.render('chatUser', {messages: mensaje, user: emailUser})
    }
    else {
        loggerError.log({
            level: "error",
            message: `Error Metodo ${req.method} y autor ${email} no encontrado`,
        });
        res.status(404).json({message: `Error Metodo ${req.method} y autor ${email} no encontrado`})
    }
};

const postNewMessage = async (req, res) => {
    try{       
        const { text, email } = req.body;
        const sessionEmail = req.user.email;
        let userType = "";
        const type = req.user.admin;
        type !== true ? userType = "usuario" : userType = "sistema"; 
        if ( !sessionEmail || !userType || !text) {
            return res.status(400).send("Faltan datos");
        }
        const mensaje = {
                email: email || sessionEmail,
                type: userType,
                date: new Date().toLocaleString(),
                text: req.body.text
            }
        await mensajes.save(mensaje);
        res.status(201).send(mensaje);
    } catch(err) {
        console.log(err, err.message)
    }
};

module.exports = {
    getAllMessages,
    getMessagesByEmail,
    postNewMessage
}