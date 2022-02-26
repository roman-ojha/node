/*
    -> to send the email admin needs to have there own email for that we as documentation it is not recommended to use gmail instaed we will use outlook
    -> if you want to use gmail then you have to give access to less secure app:
        -> https://myaccount.google.com/lesssecureapps
    -> for 10 minute email:
        -> https://10minutemail.com/
    -> npm i nodemailer
    -> https://nodemailer.com/message/
*/
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import router from "../router/router.js";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(router);

app.listen(PORT, () => {
  console.log(`Starting in ${PORT}`);
});
