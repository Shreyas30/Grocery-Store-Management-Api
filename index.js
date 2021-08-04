import express from 'express';
import cors from "cors";
import mongoose from 'mongoose'; 
import dotenv from 'dotenv';

//* To access Environment variables
dotenv.config()

//* Creating App
const app = express(); 

app.use(express.json({limit:"30mb",extended:true}));
app.use(express.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

//* Importing Routes
import ProductRoutes from "./routes/products.js";;
import UserRoutes from "./routes/user.js";;


//? Routing
app.use("/products",ProductRoutes);
app.use("/user",UserRoutes);

app.use("/",(req,res)=>{
    res.json({
        message:"Welcome"
    })
})

//* MongoDB Connection
const CONNECTION_URL = process.env.MONGODB_URL; //? FEtching From ".env" File
const PORT = process.env.PORT || 3000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(() => app.listen(PORT,()=> console.log(`Server Running on port: ${PORT}`)))
    .catch((error)=>console.log(error.message));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);