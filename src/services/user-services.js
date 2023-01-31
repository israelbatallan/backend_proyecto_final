const { userDao, cartDao } = require("../Daos/index");
const { userDto } = require("../Dtos/userDto");
const { sendMailUserOrder } = require("../utils/nodemailer");
const { isArrayToObjectPojo } = require("../utils/toPojo");


const getUser = async (req, res) => {
    const {email} = req.user;
    const data = await userDao.getByEmail(email)
    const dto = userDto(data)
    const userData = isArrayToObjectPojo(dto)
    const userAvatar = userData.thumbnail.split('public')[1];
    res.render('user', {title: "Perfil", userData, userAvatar})
};

const getUserData = async (req, res) => {
    const {email} = req.user;
    const data = await userDao.getByEmail(email)
    const dto = userDto(data)
    const userData = isArrayToObjectPojo(dto)
    res.status(200).send(userData)
};

const getUserCart = async (req, res) => {
    const {email} = req.user;
    const data = await userDao.getByEmail(email)
    const dto = userDto(data)
    const userData = isArrayToObjectPojo(dto)
    const userCart = await cartDao.getById(userData.cart[0])
    res.render('userCart', {title: "Carrito", userCart})
};


module.exports = {
    getUser,
    getUserData,
    getUserCart,
};