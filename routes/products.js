import express from 'express';
import {getProducts,addProduct,updateProduct,deleteProduct,searchProduct} from "../controllers/products.js";
const Router = express.Router();
import Authenticate from "../middleware/auth.js";

Router.get('/', Authenticate,getProducts);
Router.post('/',Authenticate, addProduct);
Router.post("/search",searchProduct);
Router.patch('/:id',Authenticate, updateProduct);
Router.delete('/:id',Authenticate, deleteProduct);

export default Router;