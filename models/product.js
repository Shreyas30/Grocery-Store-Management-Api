import mongoose  from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type:String,
        unique: true,
    },
    category: String,
    image:String,
    quantity:Number,
    price:Number,
});

const productModel = mongoose.model("product",productSchema);

export default productModel;