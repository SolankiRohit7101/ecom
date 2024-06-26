import jwt from "jsonwebtoken";
const generateJWT = async (res, user, statusCode, message) => {
  const { password: pass, ...userdata } = user._doc;
  const { email, username, _id, role, avatar, bio } = userdata;
  const token = jwt.sign(
    { username, email, _id, role, avatar, bio },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    }
  );

  const decode = jwt.verify(token, process.env.JWT_SECRET);
  return res
    .status(statusCode)
    .cookie("access_token", token, {
      httpOnly: true,
      secure: false,
      maxAge: Date.now() + 3 * 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      message,
      decode,
    });
};

export default generateJWT;
