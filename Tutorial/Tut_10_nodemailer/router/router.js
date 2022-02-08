import dotenv from "dotenv";
dotenv.config();
import express from "express";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import path from "path";
const router = express.Router();
const __dirname = path.resolve();

const adminEmail = "razzroman99@gmail.com";

const transporter = nodemailer.createTransport({
  // here we have to given the admin email and pass to varify
  service: "Gmail",
  auth: {
    user: adminEmail,
    pass: process.env.ADMIN_EMAIL_PASS,
  },
});

// DataBase
let userData = [];

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

router.post("/register", async (req, res) => {
  try {
    const { email } = req.body;
    if (email !== "") {
      const newUser = {
        email: email,
        conformed: false,
      };
      jwt.sign(
        { email: email },
        process.env.EMAIL_SECRET,
        {
          expiresIn: "1d",
        },
        (err, emailToken) => {
          // this is async way it means user will get response first and the email will be send so this way will be much faster then other way
          const url = `http://localhost:${process.env.PORT}/confirmation/${emailToken}`;
          const message = {
            // here we are create the message that we want to send
            from: adminEmail,
            to: email,
            subject: "Conform Email",
            //   text: "wow! this is good",
            html: `Please click this url to confirm you registration: <a href="${url}">${url}</a>`,
          };
          transporter.sendMail(message, function (err, info) {
            if (err) {
              console.log(err);
              return;
            }
            console.log(info.response);
          });
        }
      );

      userData.push(newUser);
    }
    res.send(`<h1>Please Conform Email</h1><a href="/login">Login</a>`);
  } catch (e) {
    console.log(e);
  }
});

router.get("/confirmation/:token", async (req, res) => {
  //   we will redirect to this url from the email that we had send to user email
  try {
    const verifyToken = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
    //here we will verify the token
    const userEmail = verifyToken.email;
    const userIndex = userData.findIndex((user) => user.email === userEmail);
    // we will find the user and set conformed = true in database
    userData[userIndex].conformed = true;
    console.log(userData[userIndex]);
    if (userData[userIndex].conformed) {
      res.send(`<h1>Email: ${userEmail}</h1>`);
    } else {
      res.send(`<h1>Please Conform Email</h1><a href="/login">Login</a>`);
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/login.html"));
});

router.post("/login", (req, res) => {
  const { email } = req.body;
  if (email !== "") {
    const user = userData.find((user) => user.email === email);
    if (user) {
      if (user.conformed) {
        // if email is varified
        res.send(`<h1>Email: ${email}</h1>`);
      } else {
        res.send(`<h1>Please Conform Email</h1><a href="/login">Login</a>`);
      }
    } else {
      res.redirect(`http://localhost:${process.env.PORT}`);
    }
  }
});

export default router;
