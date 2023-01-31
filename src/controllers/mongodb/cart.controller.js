const Router = require("express").Router;
const routerCarritos = Router();

const { ifTokenExisteNext, verifyTokenJWT, isAdmin } = require("../../middlewares/auth-strategies");

const {
    getAllCarts,
    postCreateCart,
    deleteCartById,
    getProductsInCart,
    postProducstInCart,
    deleteProductInCartById,
    emptyThisCart,
} = require("../../services/cart-services");

routerCarritos.get('/', ifTokenExisteNext, verifyTokenJWT, isAdmin, getAllCarts);

routerCarritos.post('/', ifTokenExisteNext, verifyTokenJWT, postCreateCart);

routerCarritos.delete('/:id', ifTokenExisteNext, verifyTokenJWT, isAdmin, deleteCartById);

routerCarritos
    .route("/:id/productos")
    .get(ifTokenExisteNext, verifyTokenJWT, getProductsInCart)
    .post(ifTokenExisteNext, verifyTokenJWT, postProducstInCart)
    .delete(ifTokenExisteNext, verifyTokenJWT, emptyThisCart)

routerCarritos.delete("/:id/productos/:id_prod", ifTokenExisteNext, verifyTokenJWT, deleteProductInCartById);

module.exports = routerCarritos;
