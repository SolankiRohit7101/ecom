import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
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
    },
    AddedBy: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const ProductModel = new model("Products", ProductSchema);
export default ProductModel;
