import mongoose from "mongoose";

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

const UserModel = new mongoose.model("User", userSchame);

export default UserModel;
