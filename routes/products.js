import express from 'express';
import {getProducts,addProduct,updateProduct,deleteProduct,searchProduct} from "../controllers/products.js";
const Router = express.Router();

Router.get('/', getProducts);
Router.post('/', addProduct);
Router.post("/search",searchProduct);
Router.patch('/:id', updateProduct);
Router.delete('/:id', deleteProduct);

export default Router;