import mongoose  from "mongoose";

const stockUpdateSchema = mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    quantity:Number,
    Date:{
        type:Date,
        default: new Date(),
    }
});

const stockUpdateModel = mongoose.model("stockUpdate",stockUpdateSchema);

export default stockUpdateModel;