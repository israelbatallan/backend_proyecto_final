require('dotenv').config()

const nodemailer = require('nodemailer');
const { logger, loggerError } = require('../logs/winston');


const sendMailNewUserData = (user) => {
    try {
        const {nombre, email, age, adress, phone} = user;
        const transporterGmail = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
                user: process.env.GMAIL_ADRESS,
                pass: process.env.GMAIL_PWD,
            },
        });

        transporterGmail
            .sendMail({
                from: `Servidor app CoderHouse <${process.env.GMAIL_ADRESS}>`,
                to: process.env.GMAIL_ADRESS,
                subject: "Nuevo registro",
                html: `
                <h1 style="color:green;">Nuevo Usuario Registrado</h1>
                <h2 style="color:blue;">Datos:</h2>
                <ul>
                <li>Nombre: ${nombre}</li>
                <li>Email: ${email}</li>
                <li>Edad: ${age}</li>
                <li>Dirección: ${adress}</li>
                <li>Teléfono: ${phone}</li>
                </ul>
                `,
            })
            .then((result) => {
                logger.log("info","Nuevo usuario registrado. Email con datos enviado exitosamente");
            })
            .catch((error) => loggerError.log("error", error));
    } catch (error) {
        loggerError.log("Error en nodemailer al registrar un usuario", error);
    }
};

const sendMailUserOrderToSite = (order) => {
    const {orderNumber, date, state, email, products, adress, totalPrice} = order;

    let prodsList ="";
    products.map(product => {
        return prodsList = prodsList + `<li>NOMBRE: ${product.nombre} - CANTIDAD: ${product.cantidad}  - TOTAL: $${product.precio * product.cantidad} </li>`
    });
    try {
        const transporterGmail = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
                user: process.env.GMAIL_ADRESS,
                pass: process.env.GMAIL_PWD,
            },
        });

        transporterGmail
            .sendMail({
                from: `Servidor app CoderHouse <${process.env.GMAIL_ADRESS}>`,
                to: process.env.GMAIL_ADRESS,
                subject: "Nueva compra",
                html: `
                <h1>Nuevo pedido de ${email}</h1>
                <h2>Datos:</h2>
                <ul>
                <li>Numero de orden: ${orderNumber}</li>
                <li>Fecha: ${date}</li>
                <li>Estado de orden: ${state}</li>
                <li>Email de usuario: ${email}</li>
                <li>Direccion: ${adress}</li>
                <li>Productos: <ul>${prodsList}</ul></li>
                <li>Total a pagar: $${totalPrice}</li>
                </ul>
                `,
            })
            .then((result) => {
                logger.log("info","Lista de productos comprados. Email con datos enviado exitosamente")
            })
            .catch((error) => loggerError.log("error", error.message));
    } catch (error) {
        loggerError.log("Error en nodemailer al realizar una compra", error);
    }
};

const sendMailUserOrderToUser = (order) => {
    const {orderNumber, date, state, email, products, adress, totalPrice} = order;

    let prodsList ="";
    products.map(product => {
        return prodsList = prodsList + `<li>NOMBRE: ${product.nombre} - CANTIDAD: ${product.cantidad}  - TOTAL: $${product.precio * product.cantidad} </li>`
    });
    try {
        const transporterGmail = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
                user: process.env.GMAIL_ADRESS,
                pass: process.env.GMAIL_PWD,
            },
        });

        transporterGmail
            .sendMail({
                from: `Servidor app CoderHouse <${process.env.GMAIL_ADRESS}>`,
                to: email,
                subject: "Nueva compra",
                html: `
                <h1>Nuevo pedido de ${email}</h1>
                <h2>Datos:</h2>
                <ul>
                <li>Numero de orden: ${orderNumber}</li>
                <li>Fecha: ${date}</li>
                <li>Estado de orden: ${state}</li>
                <li>Email de usuario: ${email}</li>
                <li>Direccion: ${adress}</li>
                <li>Productos: <ul>${prodsList}</ul></li>
                <li>Total a pagar: $${totalPrice}</li>
                </ul>
                `,
            })
            .then((result) => {
                logger.log("info","Lista de productos comprados. Email con datos enviado al usuario exitosamente")
            })
            .catch((error) => loggerError.log("error", error.message));
    } catch (error) {
        loggerError.log("Error en nodemailer al realizar una compra", error);
    }
};

module.exports = {
    sendMailNewUserData,
    sendMailUserOrderToSite,
    sendMailUserOrderToUser
};