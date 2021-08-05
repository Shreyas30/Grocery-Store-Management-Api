import jwt from "jsonwebtoken";

const auth = async (req,res,next) => {

    try {
        //* If Token exists
        if(req.headers.authorization){ 
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, process.env.SECRET_KEY,function(err, decoded) {
                //! If token Expired or Invalid
                if (err) {
                   return res.status(401).json({message: err.message})
                }

                req.userid = decoded?.userid;
                next();
            });
        }
        //! If Token Doesnt NOT exists
        else{
            res.status(401).json({message:"Authentication Failed"});
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: err.message})
    }
}

export default auth;
    