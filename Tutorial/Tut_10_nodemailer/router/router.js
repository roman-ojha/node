import express from "express";
import nodemailer from "nodemailer";
import path from "path";
const router = express.Router();
const __dirname = path.resolve();

const adminEmail = "razzroman99@hotmail.com";

router.get("/", (req, res) => {
  //   const transporter = nodemailer.createTransport({
  //     // here we have to given the admin email and pass to varify
  //     auth: {
  //       user: adminEmail,
  //       pass: "hello",
  //     },
  //   });

  //   const message = {
  //     // here we are create the message that we want to send
  //     from: adminEmail,
  //     to: "razzroman99@gmail.com",
  //     subject: "sending email with node.js",
  //     text: "wow! this is good",
  //     html: "<p> good to go </p>",
  //   };

  //   transporter.sendMail(message, function (err, info) {
  //     if (err) {
  //       console.log("errrrrrrr");
  //       console.log(err);
  //       return;
  //     }
  //     console.log(info.response);
  //   });
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

export default router;
