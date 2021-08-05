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

const urls = [
    {url:"/user/register",type:"POST",function:"Registration For new User",access:"Everyone"},
    {url:"/user/auth",type:"POST",function:"To Get Access Token for using API",access:"Registered User"},
    {url:"/products",type:"GET",function:"To Fetch All Products",access:"Everyone"},
    {url:"/products",type:"POST",function:"To Add a Product",access:"Admin"},
    {url:"/products/buy/:id",type:"PATCH",function:"To Buy a Products",access:"Authorised User"},
    {url:"/products/search",type:"POST",function:"To Search Products",access:"Everyone"},
    {url:"/products/stockUpdate",type:"GET",function:"To Fetch All Stock Updates",access:"Admin"},
    {url:"/products/addStock/:id",type:"PATCH",function:"To Add Stock in a Product",access:"Admin"},
    {url:"/products/:id",type:"PATCH",function:"To Update Product Information",access:"Admin"},
    {url:"/products/:id",type:"DELETE",function:"To Delete a Product",access:"Admin"}
]

app.use("/",(req,res)=>{
    res.json({
        URLs:urls,
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