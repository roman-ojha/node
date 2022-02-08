/*
    -> to send the email admin needs to have there own email for that we as documentation it is not recommended to use gmail instaed we will use outlook
*/
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import router from "../router/router.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(router);

app.listen(PORT, () => {
  console.log(`Starting in ${PORT}`);
});
