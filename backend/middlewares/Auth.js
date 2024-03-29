import jwt from "jsonwebtoken";
import ErrorHanlder from "../utils/ErrorHandler.js";

const authorize = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(new ErrorHanlder(403, "unauthorized.Please Login."));
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  if (!decode) return next(new ErrorHanlder(403, "unauthorized.Please Login."));
  req.user = decode._id;
  req.roles = decode.role;

  next();
};

export default authorize;
