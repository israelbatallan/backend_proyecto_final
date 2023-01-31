const { Router } = require("express");
const routerProductos = require("../controllers/mongodb/products.controller");
const routerCarritos = require("../controllers/mongodb/cart.controller");
const routerMensajes = require("../controllers/mongodb/messages.controller");
const routerChat = require("../controllers/mongodb/chat.controller");
const routerUser = require("../controllers/mongodb/user.controller");
const routerOrder = require("../controllers/mongodb/order.controller");
const routerViews = require("../controllers/mongodb/views.controller");
const apiRouter = Router();

apiRouter.use('/api/productos', routerProductos);
apiRouter.use('/api/carrito', routerCarritos);
apiRouter.use('/api/mensajes', routerMensajes);
apiRouter.use('/orders', routerOrder);
apiRouter.use('/chat', routerChat);
apiRouter.use('/', routerUser);
apiRouter.use('/', routerViews);

module.exports = apiRouter;