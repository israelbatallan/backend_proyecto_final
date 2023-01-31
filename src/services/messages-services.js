
const { messageDao } = require("../Daos/index");
const { loggerError } = require("../logs/winston");

const mensajes = messageDao;


const getAllMessages = async (req, res) => {
    const messages = await mensajes.getAll();
    messages !== null && messages.length > 0
    ? res.status(200).send(messages)
    : res.status(404).json({message: "No hay mensajes"})
};

const getMessagesById = async (req, res) => {
    const id = req.params.id;
    const mensajePorId = await mensajes.getById(id);
    console.log(mensajePorId)
    if (mensajePorId !== null) return res.status(200).send(mensajePorId);
    else {
        loggerError.log({
            level: "error",
            message: `Error Mensaje ID: ${id} no existe`,
        });
        return res.status(404).json({message:`Error Mensaje ID: ${id} no existe`});
    }
};

const deleteMessageById = async (req, res) => {
    const id = req.params.id;
    const mensajePorId = await mensajes.getById(id);
    if (mensajePorId !== null) {
        await mensajes.deleteById(id);
        return res.status(201).send(`Message ID: ${id} borrado`);
    } else {
        loggerError.log({
            level: "error",
            message: `Error Metodo: ${req.method} Mensaje ${id} no existe`,
        });
        return res.status(404).json({message:`ERROR Mensaje ID:${id} no encontrado`});
    }
};

const postNewMessage = async (req, res) => {
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
            text: text,
        };
    await mensajes.save(mensaje);
    res.status(201).send(mensaje);
};

const getMessagesByEmail = async (req, res) => {
    const email = req.params.email;
    const mensaje = await mensajes.getByEmail(email);
    if (mensaje!== null && mensaje.length > 0) return res.status(200).send(mensaje);
    else {
        loggerError.log({
            level: "error",
            message: `Error Metodo ${req.method} y autor ${email} no encontrado`,
        });
        res.status(404).json({message: `Error Metodo ${req.method} y autor ${email} no encontrado`})
    }
};

module.exports = {
    getAllMessages,
    getMessagesById,
    deleteMessageById,
    postNewMessage,
    getMessagesByEmail,
};