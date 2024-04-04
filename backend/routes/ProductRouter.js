import express from "express";
import authorize from "../middlewares/Auth.js";
import CheckRole from "../middlewares/CheckRole.js";
import rolesList from "../utils/roles.js";
import {
  AddProduct,
  DeleteProduct,
  GetAllProduct,
} from "../controller/ProductController.js";
import upload from "../middlewares/Multer.js";

const ProductRouter = express.Router();
ProductRouter.post(
  "/products/add",
  upload.array("ProductImages[]", 10),
  authorize,
  CheckRole(rolesList.Admin, rolesList.SuperAdmin),
  AddProduct
);
ProductRouter.get("/products", GetAllProduct);
ProductRouter.delete(
  "/product/remove/:_id",
  authorize,
  CheckRole(rolesList.Admin, rolesList.SuperAdmin),
  DeleteProduct
);

export default ProductRouter;
