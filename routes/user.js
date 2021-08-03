import express from 'express';
import {registerUser,authenticateUser} from "../controllers/user.js";
const Router = express.Router();

Router.post('/register',registerUser);
Router.post('/auth',authenticateUser);

export default Router;