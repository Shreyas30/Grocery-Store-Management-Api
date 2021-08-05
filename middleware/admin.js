import userModel from "../models/user.js"
const adminCheck = async (req,res,next) => {

    try {
        if(req?.userid){
            const user = await userModel.findById(req?.userid);
            if(user.isadmin){
                next();
            }
            else{
                return res.status(401).json({message:"User is Not an Admin"})
            }
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: err.message})
    }
}

export default adminCheck ;