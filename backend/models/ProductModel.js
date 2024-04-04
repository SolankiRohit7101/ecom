import mongoose, { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  ProductName: {
    type: String,
    required: true,
    unique: true,
  },
  ProductPrice: {
    type: Number,
    required: true,
  },
  ProductDescription: {
    type: String,
    required: true,
  },
  AddedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  stock: {
    type: Number,
    default: 50,
  },
  rating: {
    type: Number,
    default: 0,
  },
  ProductImages: {
    type: Array,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const ProductModel = new model("Products", ProductSchema);
export default ProductModel;
