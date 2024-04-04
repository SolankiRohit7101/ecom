import express from "express";
import {
  userRegister,
  userLogin,
  userProfile,
  userLogout,
  userData,
} from "../controller/userController.js";
import authorize from "../middlewares/Auth.js";
import roles from "../utils/roles.js";
import CheckRole from "../middlewares/CheckRole.js";
import { upload } from "../middlewares/Multer.js";

const userRouter = express.Router();

userRouter.post(
  "/register",
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  userRegister
);
userRouter.post("/login", userLogin);
userRouter.get("/logout", authorize, userLogout);
userRouter.post(
  "/profile",
  authorize,
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  userProfile
);
userRouter.get("/user", userData);

export default userRouter;



