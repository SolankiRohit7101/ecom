import ProductModel from "../models/ProductModel.js";
import UserModel from "../models/UserModel.js";
import uploadCloudinary from "../utils/Cloudinary.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import ReviewModle from "../models/ReviewsModel.js";
export const AddProduct = async (req, res, next) => {
  const { ProductName, ProductPrice, ProductDescription, stock } = req.body;
  const imageLocalPath = [];
  req.files?.map((obj) => {
    imageLocalPath.push(obj.path);
  });
  if (!ProductName || !ProductPrice || !ProductDescription)
    return next(new ErrorHandler(400, "Please Provide All Fields."));
  const isProduct = await ProductModel.findOne({ ProductName });
  if (isProduct)
    return next(new ErrorHandler(400, "Product Name is already in the db"));
  try {
    let images = [];
    for (let i = 0; i < imageLocalPath.length; i++) {
      const image = await uploadCloudinary(imageLocalPath[i], "product");
      images.push(image.url);
    }
    const product = await ProductModel({
      ProductName,
      ProductPrice,
      ProductDescription,
      stock,
      AddedBy: req.user,
      ProductImages: images,
    });
    await product.save();
    return res
      .json({ success: true, message: "product added Successfully", product })
      .status(201);
  } catch (error) {
    return next(error);
  }
};

export const GetAllProduct = async (req, res, next) => {
  try {
    const products = await ProductModel.find()
      .select("-__v")
      .select("-timestamps");
    return res.json({
      success: true,
      message: "products data fetch successfully",
      products,
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteProduct = async (req, res, next) => {
  const { _id } = req.params;
  const Product = await ProductModel.findById(_id);
  if (Product.AddedBy === req.user || req.roles === 7103) {
    res.json({ message: "success" });
  }
};

export const ProductAllReviews = async (req, res, next) => {
  const { id } = req.params;
  const pr = await ReviewModle.find({ product: id });

  return res.json({
    success: true,
    message: "Reviews fetch successfully",
    pr,
  });
};

export const AddProductReview = async (req, res, next) => {
  const { productId } = req.params;
  const { comment, rating } = req.body;
  const user = await UserModel.findOne({ _id: req.user });

  console.log("here")
  const review = await ReviewModle({
    message: comment,
    rating,
    product: productId,
    user: user.username,
  });

  await review.save();

  res.json({
    succesS: true,
    message: "review added successfully",
  });
};
