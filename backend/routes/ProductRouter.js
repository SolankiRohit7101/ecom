import express from "express";
import authorize from "../middlewares/Auth.js";
import CheckRole from "../middlewares/CheckRole.js";
import rolesList from "../utils/roles.js";
import {
  AddProduct,
  DeleteProduct,
  GetAllProduct,
} from "../controller/ProductController.js";

const ProductRouter = express.Router();
ProductRouter.post(
  "/product/add",
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
