import express from 'express';
import {getProducts} from "../controllers/products.js";
const Router = express.Router();

Router.get('/', getProducts);

export default Router;