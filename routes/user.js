import express from 'express';
import {registerUser,authenticateUSer} from "../controllers/user.js";
const Router = express.Router();

Router.post('/register',registerUser);
Router.post('/auth',authenticateUSer);

export default Router;