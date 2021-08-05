import mongoose  from "mongoose";

const userSchema = mongoose.Schema({
    name: String,
    username:{
        type: String,
        unique: true,
    },
    email:{
        type: String,
        unique: true,
    },
    isadmin:{
        type: Boolean,
        default: false,
    },
    password:String,
});

const userModel = mongoose.model("user",userSchema);

export default userModel;