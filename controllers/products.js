import productModel from "../models/product.js";




export const getProducts = async (req,res) =>{
    productModel.find(function(err, foundItems){
        if(err){
            res.status(404).json({message: err.message});
        }else{
            res.status(200).json({
                message: "Success",
                data: foundItems
        })
    }
    })
};
export const addProduct = async (req,res) =>{
    const newProduct = new productModel({
        name : req.body.name,
        category : req.body.category,
        image : req.body.imageURL,
        quantity : req.body.quantity,
        price: req.body.price
    })
    try{
        await newProduct.save()
        res.status(200).json({message:"Added successfully"});
    }
   catch(err){
       console.log(err)
       res.status(404).json({message: err.message});
   }
};

export const updateProduct = async (req,res) =>{

    const updatedProduct = new productModel({
        name : req.body.name,
        category : req.body.category,
        image : req.body.imageURL,
        quantity : req.body.quantity,
        price: req.body.price
    })

    productModel.updateOne({ _id: req.params.id}, updateProduct, function(err, res) {

        if(err){
            res.status(404).json({message: err.message});
        }else{
            res.status(200).json({
                message: "Success",
        })
    }
        // Updated at most one doc, `res.modifiedCount` contains the number
        // of docs that MongoDB updated
      });
};

export const deleteProduct = (req,res) =>{
    productModel.deleteOne({ _id: req.params.id }, function (err) {
        if(err){
            res.status(404).json({message: err.message});
        }else{
            res.status(200).json({
                message: "Success",
        })
    }
        // deleted item
      });
};

export const searchProduct = (req,res) =>{
    productModel.findOne({name: req.params.name}, function(err, foundItems){
        if(err){
            res.status(404).json({message: err.message});
        }else{
            res.status(200).json({
                message: "Success",
                data: foundItems
        })
    }
    })
};