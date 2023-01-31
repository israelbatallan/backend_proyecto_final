const { productsDao } = require("../Daos/index");

const productos = productsDao;
const {loggerError}  = require("../logs/winston");
const { arrayOrObjectToPOJO } = require("../utils/toPojo");

const getAllProducts = async (req, res) => {
    res.status(200).send(await productos.getAll())
};

const getProductsById = async (req, res) => {
    const id = req.params.id;
    const productoPorId = await productos.getById(id);
    if (productoPorId !== null) return res.status(200).send(productoPorId);
    else {
        loggerError.log({
            level: "error",
            message: `Error Metodo: ${req.method} Producto ${id} no existe`,
        });
        return res.status(404).json(`ERROR Producto ID:${id} no encontrado`);
    }
};

const postNewProduct = async (req, res) => {
    const { nombre, descripcion, precio, foto, stock, categoria } = req.body;
   const newProd = { nombre, descripcion, precio, foto, stock, categoria };
    return res.status(201).send(await productos.save(newProd))

};

const deleteProductById = async (req, res) => {
    const id = req.params.id;
    const productoPorId = await productos.getById(id);
    if (productoPorId !== null) {
        await productos.deleteById(id);
        return res.status(201).send(`Producto ID: ${id} borrado`);
    } else {
        loggerError.log({
            level: "error",
            message: `Error Metodo: ${req.method} Producto ${id} no existe`,
        });
        return res.status(404).json(`ERROR Producto ID:${id} no encontrado`);
    }
};

const putProductById = async (req, res) => {
    const id = req.params.id;
    const exist = await productos.getById(id);
    if (exist !== null) {
        const { nombre, descripcion, precio, foto, stock, categoria } = req.body;
        const prod_editado = await productos.updateById((id), {
            nombre,
            descripcion,
            precio,
            foto,
            stock,
            categoria,
        });
        res.status(201).send(await productos.getById(id));
    } else res.status(404).json(`ERROR ID:${id} no encontrado`);
};

const getProductByCategoryOrId = async (req, res) => {
    const categoria = req.params.categoria;
    const prodByCat = await productos.filterByCategory(categoria);
    if (prodByCat !== null && prodByCat.length > 0) {
        const prods = arrayOrObjectToPOJO(prodByCat)
        res.status(200).send(prods)
    } else if (prodByCat === null) {
        id = categoria;
        const prodById = await productos.getById(id);
        if (prodById !== null) return res.status(200).send(prodById);
        else return res.status(404).send({message:`ERROR Producto ID:${id} no encontrado`});
    } else {
        res.status(404).json({
            message: `Error: el parámetro ingresado ${categoria} no es una categoría o ID válido/a`,
        });
    }
};


module.exports = {
    getAllProducts,
    getProductsById,
    postNewProduct,
    deleteProductById,
    putProductById,
    getProductByCategoryOrId,
};