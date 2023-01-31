require('dotenv').config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { loggerError } = require('../logs/winston');
const { cartDao, userDao } = require('../Daos/index');
const { objetcToPOJO } = require('../utils/toPojo');
const { sendMailNewUserData } = require('../utils/nodemailer');

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_IN })
};


const registration = async (req, res, next) => {
    if (req.body.password !== req.body.repeatPassword) {
        res.render('failsignup', { error: "Las contraseñas no coinciden" })
    } else {
        try {
            const { email, password, nombre, age, phone, adress } = req.body;
            const hashedPasword = bcrypt.hashSync(password, 10);
            const userCartId = await cartDao.createCarrito(email, adress);// create cart return id
            let user = {
                cart: userCartId,
                nombre: nombre,
                age: age,
                phone: phone,
                adress: adress,
                email: email,
                password: hashedPasword,
            };
            if (req.file === undefined) {
                user.thumbnail = "public/assets/img/users/anonimus.jpg";
            } else {
                let newPath = req.file.path.replace("public/", "");
                user.thumbnail = newPath;
            }
            sendMailNewUserData(user);//send mail to Site, utils/nodemailer
            const newUser = await userDao.save(user);//create user
            const userParsed = objetcToPOJO(newUser)
            const accessToken = generateAccessToken({ email: userParsed.email, admin: userParsed.admin });//if admin in DB admin === true, else does not exist in token
            res.clearCookie("token")
            res.cookie("token", accessToken, {
                httpOnly: true
            })
            return next()
        } catch (error) {
            loggerError.log("error", `Error: ${error}, al registrar un usuario `)
            res.status(500).json({ message: error })
        }
    }
};


const loginJWT = async (req, res, next) => {
    try {
        let user = await userDao.getByEmail(req.body.email);
        if (user === null) {
            return res.render('faillogin', { error: "El usuario no esta registrado" })
        }
        if (user !== null) {
            const userParsed = objetcToPOJO(user)
            const comparar = bcrypt.compareSync(req.body.password, userParsed.password);
            if (!comparar) return res.render('faillogin', { error: "Password incorrecto" })
            if (comparar) {
                const { email, admin } = userParsed;
                const accessToken = generateAccessToken({ email, admin }) // is admin exist === true, else does not exist in token
                res.clearCookie("token")
                res.cookie("token", accessToken, {
                    httpOnly: true
                })
                return next()
            }
        } else {
            res.redirect('/faillogin')
        }
    } catch (err) {
        console.log(err);
        loggerError.log("error", `Error: ${err}`)
        res.status(500).send(err)
    }
};

const ifTokenExisteNext = (req, res, next) => {
    if (req.cookies.token !== undefined) {
        return next()
    }
    else {
        res.clearCookie("token");
        res.redirect("/login");
    }
};

const isAdmin = (req, res, next) => {
    if (req.user.admin === true) {
        next()
    } else {
        res.status(403).json({ message: "Error 403 - No posee los permisos necesarios" })
    }
};

const verifyTokenJWT = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (token) {
            const verify = jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
                if (err) {
                    res.clearCookie("token");
                    return res.redirect("/")
                }
                if (!err) {
                    req.user = user;
                    const userValid = await userDao.getByEmail(req.user.email);
                    if (userValid === null) {
                        res.clearCookie("token");
                        return res.redirect("/")
                    }
                    req.user = user;
                    return next()
                }
            })
        }
        else {
            res.clearCookie("token");
            return res.redirect("/login")
        }
    } catch (err) {
        loggerError.log('error', `Error: ${err}, Message: ${err.message}`)
        res.status(500).send(err)
    }
};


module.exports = {
    verifyTokenJWT,
    registration,
    verifyTokenJWT,
    loginJWT,
    ifTokenExisteNext,
    isAdmin
}