
const Router = require('express').Router;
const routesHBS = require('../../services/views-services')
const uploadFile = require('../../middlewares/multer');

const routerViews = Router();

const { registration, verifyTokenJWT, loginJWT, ifTokenExisteNext } = require('../../middlewares/auth-strategies');

// ROOT - HOME
routerViews.get('/', ifTokenExisteNext, verifyTokenJWT, routesHBS.getRoot)
routerViews.get("/productos", ifTokenExisteNext, verifyTokenJWT, routesHBS.getHome);
routerViews.get("/productos/:categoria?",ifTokenExisteNext, verifyTokenJWT, routesHBS.getProductByCategoryOrId);

// SIGNUP
routerViews.get('/signup', routesHBS.getSignup);
routerViews.post('/signup', uploadFile(), registration, routesHBS.postSignup)
routerViews.get("/failsignup", routesHBS.getFailSignup);

//  LOGIN
routerViews.get('/login', routesHBS.getLogin);
routerViews.post('/login', loginJWT, routesHBS.postLogin);
routerViews.get('/faillogin', ifTokenExisteNext, verifyTokenJWT, routesHBS.getFailLogin);

// LOGOUT
routerViews.get("/logout", ifTokenExisteNext, verifyTokenJWT, routesHBS.getLogout);


module.exports = routerViews;