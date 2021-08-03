import jwt from "jsonwebtoken";

const auth = async (req,res,next) => {

    try {
        //* If Token exists
        if(req.headers.authorization){ 
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, process.env.SECRET_KEY,function(err, decoded) {
                //! If token Expired or Invalid
                if (err) {
                    res.status(401).json({message: err.message})
                }

                req.username = decoded?.username;
                next();
            });
        }
        //! If Token Doesnt NOT exists
        else{
            res.status(401).json({message:"Authentication Failed"});
        }

    } catch (error) {
        console.log(error);
    }
}

export default auth;
    