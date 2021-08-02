import mongoose  from "mongoose";

const transactionSchema = mongoose.Schema({
    productID: Mongoose.Schema.ObjectId(),
    username:{
        type: String,
        unique: true,
    },
    quantiy:Number,
    Date:{
        type:Date,
        default: new Date(),
    }
});

const transactionModel = mongoose.model("transaction",transactionSchema);

export default transactionModel;