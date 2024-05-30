import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import dbConnect from "./utils/dbConnection.js";

import userRouter from "./routes/userRouter.js";
import ProductRouter from "./routes/ProductRouter.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const corsOptions = {
  origin: "https://ecom-opal-zeta.vercel.app",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};

app.use(cors(corsOptions));
dbConnect();

app.use("/api/v1/", userRouter);
app.use("/api/v1/", ProductRouter);

app.listen(process.env.PORT, () =>
  console.log(`server running on http://localhost:${process.env.PORT}`)
);

app.use(errorMiddleware);
