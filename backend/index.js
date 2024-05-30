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
const allowedOrigins = [
  'https://ecom-lemon-five.vercel.app',
  'https://ecom-jkgn276va-roht7101s-projects.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
};

dbConnect();

app.use("/api/v1/", userRouter);
app.use("/api/v1/", ProductRouter);

app.listen(process.env.PORT, () =>
  console.log(`server running on http://localhost:${process.env.PORT}`)
);

app.use(errorMiddleware);
