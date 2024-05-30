import mongoose from "mongoose";
import { string } from "valibot";
import { contactUs } from "../controller/userController.js";

const userSchame = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      select: false,
    },
    bio: {
      type: String,
      default: "Hey! lets explore",
    },
    /*  animeList: {
      type: Array,
      require: true,
      default: [],
    }, */

    role: {
      type: Number,
      default: 7101,
    },
    avatar: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const contactSchame = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
});

export const contactModel = new mongoose.model("Contact", contactSchame);
const UserModel = new mongoose.model("User", userSchame);

export default UserModel;
