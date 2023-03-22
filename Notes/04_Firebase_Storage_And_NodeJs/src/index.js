import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import storageRouter from "../router/storageRoute.js";
const app = express();
app.use(cookieParser());
dotenv.config({ path: "../config.env" });
app.use(express.json());
const PORT = process.env.PORT;

// Database connection
import("../db/userStorageConnection.js");

// Connection router
app.use(storageRouter);

// listening to a 'PORT'
app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
