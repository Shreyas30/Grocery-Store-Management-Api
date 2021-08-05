import express from 'express';
import {getProducts,addProduct,updateProduct,deleteProduct,searchProduct,stockUpdate,buyProduct,addStock} from "../controllers/products.js";
const Router = express.Router();
import Authenticate from "../middleware/auth.js";
import AdminCheck from "../middleware/admin.js";

Router.get('/',getProducts);
Router.post('/',Authenticate,AdminCheck, addProduct);
Router.patch('/buy/:id',Authenticate, buyProduct);
Router.post("/search",searchProduct);
Router.get("/stockUpdate",Authenticate,AdminCheck,stockUpdate);
Router.patch("/addStock/:id",Authenticate,AdminCheck,addStock);
Router.patch('/:id',Authenticate,AdminCheck, updateProduct);
Router.delete('/:id',Authenticate,AdminCheck, deleteProduct);

export default Router;