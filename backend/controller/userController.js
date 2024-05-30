import { LoginSchema, SignUpSchema } from "../utils/DataValidation.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import generateJWT from "../utils/generateJWT.js";
import uploadCloudinary, { deleteCloudinary } from "../utils/Cloudinary.js";
import { contactModel } from "../models/UserModel.js";
export const userRegister = async (req, res, next) => {
  const { username, email, password /* ,animeList  */ } = req.body;
  const isValidData = SignUpSchema._parse({
    username,
    email,
    password /* , animeList */,
  });
  if (!isValidData.issues) {
    try {
      const isUser = await UserModel.findOne({ email });
      if (isUser) {
        return next(
          new ErrorHandler(400, "user is already registered with us.")
        );
      }
      const hashPassword = await bcrypt.hash(password, 8);
      const avatarLocalPath = req?.files?.avatar[0]?.path;
      console.log(avatarLocalPath);
      if (!avatarLocalPath) {
        return next(new ErrorHandler(400, "Avatar is required"));
      }
      const avatar = await uploadCloudinary(avatarLocalPath);
      const user = await UserModel.create({
        username,
        email,
        password: hashPassword,
        avatar: {
          public_id: avatar.asset_id,
          url: avatar.url,
        },
        /*  animeList, */
      });
      await user.save();
      generateJWT(res, user, 200, "successfully registered");
    } catch (error) {
      return next(error);
    }
  } else {
    console.log(isValidData.issues);
    return next(new ErrorHandler(400, isValidData.issues[0].message));
  }
};

export const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const isValidData = LoginSchema._parse({ email, password });
  if (!isValidData.issues) {
    try {
      const isUser = await UserModel.findOne({ email }).select("+password");
      if (!isUser) {
        return next(new ErrorHandler(400, "Invalid Credintals"));
      } else {
        const IsPassword = bcrypt.compare(password, isUser.password);
        if (IsPassword) {
          generateJWT(res, isUser, 200, "successfully Login");
        } else {
          return next(new ErrorHandler(400, "Invalid Credintals"));
        }
      }
    } catch (error) {
      return next(error);
    }
  } else {
    return next(new ErrorHandler(400, isValidData.issues[0].message));
  }
};

export const userLogout = (req, res, next) => {
  return res
    .cookie("access_token", "", { maxAge: Date.now() })
    .status(200)
    .json({ success: true, message: "logout Successfully" });
};

export const userProfile = async (req, res, next) => {
  const { username, bio } = req.body;
  const userData = await UserModel.findOne({ _id: req.user }).select(
    "-password -email "
  );
  const imageurl = userData.avatar.url.split("/");
  const imageName = imageurl[imageurl.length - 1].split(".")[0];

  const avatarLocalPath = req?.files?.avatar[0]?.path;
  await deleteCloudinary(imageName);
  const avatar = await uploadCloudinary(avatarLocalPath);
  const user = await UserModel.findByIdAndUpdate(
    req.user,
    {
      username,
      bio,
      avatar: {
        public_id: avatar.asset_id,
        url: avatar.url,
      },
    },
    {
      returnDocument: "after",
    }
  );
  await user.save();
  generateJWT(res, user, 201, "successfully Profile Updated.");
};

export const contactUs = async (req, res, next) => {
  const { message, name, email } = req.body;
  try {
    const contact = await contactModel.create({
      message,
      name,
      email,
    });
    res.status(200).json({
      success: true,
      message:
        "We have Receive your Message. We'll reach out to you soon. Please have patience.",
    });
  } catch (error) {
    next(error);
  }
};
export const userData = async (req, res, next) => {};
