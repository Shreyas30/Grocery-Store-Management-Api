import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import userModel from "../models/user.js";
//* To access Environment variables
dotenv.config()

export const registerUser = async (req,res) =>{
    const {name,username,email,password} = req.body;

    try {

        const hashPassword = await bcrypt.hash(password,12);
    
        const newUser = {
            name:name,
            username:username,
            email:email,
            password:hashPassword,
        } 

        const existingUser = await userModel.findOne(newUser);

        //? User Already Exists
        if(existingUser)
            res.status(200).json({message:"User Alreay Exists"});

        //! USer Doesnt Exists
        else{
            await userModel.create(newUser);
            res.status(200).json({message:"Registration Suceessful"});
        }

    } catch (error) {
        console.log(error);
         res.status(500).json(error);
    }

}


export const authenticateUser = async (req,res) =>{
    const {username,password} = req.body;
    
    try {
        
        const existingUser = await userModel.findOne({username:username});
        
        if(!existingUser)  //! USer Doesnt Exists
            return res.status(404).json({message:"User Doesn't Exists"});

        //* If User Exists
        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);

        
        //! If Wrong Password
        if(!isPasswordCorrect) 
            return res.status(400).json({message:"Invalid Credentials"});
        
        //* If Password Correct 
        const token = jwt.sign({userid:existingUser._id,username:existingUser.username},process.env.SECRET_KEY,{expiresIn:"1h"});
        res.status(200).json({message:"Your Token Will be Valid for 1 Hour",token:token});
     
    } catch (error) {
        console.log(error);
         res.status(500).json(error);
    }

}