require('dotenv').config();

const Router = require('express').Router;

const routesHBS = Router();

const { userDao, productsDao } = require('../Daos/index');
const {  objetcToPOJO, arrayOrObjectToPOJO } = require('../utils/toPojo');


const getRoot = (req, res) => {
    return res.redirect('/productos')
};

const getHome = async (req, res) => {
    let userEMail = req.user.email;
    if(userEMail){
        const data = await userDao.getByEmail(userEMail)
        const userData = objetcToPOJO(data)
        const userAvatar = userData.thumbnail.split("public")[1];
        return res.render("index", {
            title: "HOME - Productos",
            user: userEMail,
            isAdmin: userData.admin,
            userAvatar: userAvatar
        })
    }else {
        return res.redirect('/login')
    }
};

const getSignup = (req, res) => {
    let token = req.cookies.token;
    if(token !== undefined)return res.redirect("/productos");
    else return res.render("signup", { title: "Signup" });
};

const postSignup = (req, res) => {
    return res.redirect('/productos')
};

const getFailSignup = (req, res) => {
    res.render("failsignup");
};

const getLogin = (req, res) => {
    let token = req.cookies.token;
    if(token !== undefined) return res.redirect("/productos");
    else return res.render("login", { title: "Login" });
};

const postLogin = async (req, res) => {
    return res.redirect('/productos')
};

const getFailLogin = (req, res) => {
    return res.render("faillogin");
};

const getLogout = (req, res) => {
    let {email} = req.user;
    res.render('logout', {user: email})
    res.clearCookie("token");
};

const getProductByCategoryOrId = async (req, res) => {
    const categoria = req.params.categoria;
    const prodByCat = await productsDao.filterByCategory(categoria);
    if (prodByCat !== null && prodByCat.length > 0) {
        const pojo = arrayOrObjectToPOJO(prodByCat)
        res.render('productos', {productos: pojo});
    } else {
        return res.render('404',{error:`Error: el parámetro ingresado ${categoria} no es una categoría válido/a`});
    }
};

module.exports = {
    routesHBS,
    getRoot,
    getSignup,
    getLogin,
    postLogin,
    getHome,
    getFailLogin,
    getFailSignup,
    getLogout,
    getProductByCategoryOrId,
    postSignup
};