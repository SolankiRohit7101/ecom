import ProductModel from "../models/ProductModel.js";
import UserModel from "../models/UserModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const AddProduct = async (req, res, next) => {
  const { ProductName, ProductPrice, ProductDescription } = req.body;
  if (!ProductName || !ProductPrice || !ProductDescription)
    return next(new ErrorHandler(400, "Please Provide All Fields."));
  const isProduct = await ProductModel.findOne({ ProductName });
  if (isProduct)
    return next(new ErrorHandler(400, "Product Name is already in the db"));
  try {
    const product = await ProductModel({
      ProductName,
      ProductPrice,
      ProductDescription,
      AddedBy: req.user,
    });
    await product.save();
    return res
      .json({ success: true, message: "product added Successfully" })
      .status(201);
  } catch (error) {
    return next(error);
  }
};

export const GetAllProduct = async (req, res, next) => {
  const Products = await ProductModel.find()
    .select("-__v")
    .select("-timestamps");
  console.log(Products);
  res.json(Products);
};

export const DeleteProduct = async (req, res, next) => {
  const { _id } = req.params;
  const Product = await ProductModel.findById(_id);
  if (Product.AddedBy === req.user || req.roles === 7103) {
    res.json({ message: "success" });
  }
};
