const Router = require("express").Router;
const routerProductos = Router();

const { verifyTokenJWT, ifTokenExisteNext} = require("../../middlewares/auth-strategies");


const {
    getAllProducts,
    getProductsById,
    postNewProduct,
    deleteProductById,
    putProductById,
    getProductByCategoryOrId
} = require("../../services/products-services");


routerProductos
    .route("/")
    .get( ifTokenExisteNext,verifyTokenJWT,getAllProducts)
    .post(ifTokenExisteNext, verifyTokenJWT, postNewProduct)
;

routerProductos.delete('/:id', ifTokenExisteNext, verifyTokenJWT, deleteProductById);

routerProductos.put('/:id', ifTokenExisteNext, verifyTokenJWT, putProductById);

routerProductos.get('/:categoria?', ifTokenExisteNext,verifyTokenJWT, getProductByCategoryOrId);


module.exports = routerProductos;