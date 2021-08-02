import express from 'express';
import cors from "cors";
import mongoose from 'mongoose'; 
import dotenv from 'dotenv';
import path,{ dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

//* To access Environment variables
dotenv.config()

//* Creating App
const app = express(); 

app.use(express.json({limit:"30mb",extended:true}));
app.use(express.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

//* Importing Routes
import Routes from "./routes/products.js";;

//* view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//? Routing
app.use("/",Routes);

//* MongoDB Connection
const CONNECTION_URL = process.env.MONGODB_URL; //? FEtching From ".env" File
const PORT = process.env.PORT || 3000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(() => app.listen(PORT,()=> console.log(`Server Running on port: ${PORT}`)))
    .catch((error)=>console.log(error.message));

mongoose.set("useFindAndModify",false);