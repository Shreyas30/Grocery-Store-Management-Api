import productModel from "../models/product.js";
import stockUpdateModel from "../models/stockUpdate.js";

export const getProducts = (req, res) => {
  productModel.find().select({image:0}).exec(function (err, foundItems) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({
        message: "Success",
        data: foundItems,
      });
    }
  });
};

export const addProduct = async (req, res) => {
  const newProduct = new productModel({
    name: req.body.name,
    category: req.body.category,
    image: req.body.image,
    quantity: Number(req.body.quantity),
    quantityUnit: req.body.quantityUnit,
    price: Number(req.body.price),
  });

  try {
    await newProduct.save();
    res.status(201).json({ message: "Product Added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  
  const { name, category, image, price, quantity, quantityUnit } = req.body;
  try {
    const existingProduct = await productModel.findById(req.params.id);

    const updatedProduct = ({
      name: name ? name : existingProduct?.name,
      category: category ? category : existingProduct.category,
      image: image ? image : existingProduct.image,
      price: price ? Number(price) : Number(existingProduct.price),
      quantityUnit: quantityUnit ? quantityUnit : existingProduct.quantityUnit,
      quantity: quantity ? Number(quantity) : Number( existingProduct.quantity),
    });
  
    productModel.findByIdAndUpdate(
      req.params.id ,
      updatedProduct,
      function (err, respose) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: err.message });
        } else {
          res.status(200).json({
            message: "Product Updated Successfully",
          });
        }
      });
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }

  
};

export const deleteProduct = (req, res) => {
  productModel.findByIdAndDelete({ _id: req.params.id }, function (err) {
    if (err) {
      res.status(404).json({ message: err.message });
    } else {
      res.status(200).json({
        message: "Product Deleted Successfully",
      });
    }
  });
};

export const searchProduct = (req, res) => {
  const queryProduct = req.body;

  productModel.find(queryProduct,{image:0}, function (err, foundItems) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      let message = "Success";
      if (foundItems.length === 0) message = "No Match Found";

      res.status(200).json({
        message: message,
        data: foundItems,
      });
    }
  });
};

export const stockUpdate = (req, res) => {
  stockUpdateModel.find()
  .populate("product","name quantity")
  .populate("addedBy","name username")
  .exec(function (err, foundItems) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({
        message: "Success",
        data: foundItems,
      });
    }
  });
};

export const buyProduct = async (req, res) => {
  const { quantity } = req.body;
  try {
    const existingProduct = await productModel.findById(req.params.id);
    if (existingProduct.quantity >= Number(quantity)) {
      productModel.findByIdAndUpdate(
       req.params.id ,
        { quantity: existingProduct.quantity - Number(quantity) },
        function (err, response) {
          if (err) {
            res.status(500).json({ error: err.message });
          } else {
            res.status(200).json({
              message: "Succcess",
            });
          }
        }
      );
    } else {
      res.status(200).json({
        message: "Not Enough Quantity",
      });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const addStock = async (req, res) => {
  
  const { quantity } = req.body;
  try {
    const existingProduct = await productModel.findById(req.params.id);
  
    productModel.findByIdAndUpdate(
      req.params.id ,
      {quantity: existingProduct.quantity + Number(quantity)},
      function (err, respose) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: err.message });
        } else {
          stockUpdateModel.create(
            { product: req.params.id, addedBy: req.userid, quantity: quantity },
            (err1) => {
              if (err1) {
                console.error(err1);
                res.status(500).json({ error: err.message });
              } else {
                res.status(200).json({
                  message: "Product Updated Successfully",
                });
              }
            }
          );
        }
      }
    );
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }

  
};

