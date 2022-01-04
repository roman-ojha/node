/*
    -> http://www.passportjs.org/packages/
    -> firtly install:
        npm install passport
        npm install passport-google-oauth2
*/

// NOTE: if you want to use this technique using react and node that this article will help you:
// Aticle - https://stackoverflow.com/questions/55079181/what-is-the-best-practice-to-use-oauth2-react-node-js-and-passport-js-to-authe

const express = require("express");
const passport = require("passport");
const session = require("express-session");

require("./auth");

function isLoggedIn(req, res, next) {
  // now we need a function to check wehther the user is login in or not
  // this will going to be a middleware function
  req.user ? next() : res.sendStatus(401);
  // now for the happy path if they are logged in there is one more thing we need to do and that's to allow this user to become part of the request whenever someone logged in and to do this we need a something called session management
  // and express provide the 'express-session' package
  // and we will going to use this as a middleware
}

const app = express();

app.use(session({ secret: "cats", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  // here we are creating a ancher tag which will redirect to log using google on '/'
  res.send('<a href="/auth/google">Authenticate with google</a>');
});

// when user go to this path then user will going to be authenticated
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
  // here we want to get authenticate by google so we will use google
  // here 'scope' is that what kind of information do we want to retrive from the user profile
);

// now we need to have for the google callback
app.get(
  "/google/callback",
  passport.authenticate("google", {
    // here second parameter define our success redirect and filear redirect

    successRedirect: "/protected",
    // so if someone successfully authenticated we want to bring them to protected route
    failureRedirect: "/auth/failure",
    //  if someone fail to authenticated we want to bring them to /auth/failure route
  })
);

app.get("/auth/failure", (req, res) => {
  res.send("something went worng!!!");
});

app.get("/protected", isLoggedIn, (req, res) => {
  // this is the route that we don't want people to be able to visit unless they are logged in
  // here we are using 'isLoggedIn' middelware to check wheter user had logged in or not
  res.send(req.user.displayName);
  console.log(req.user);
  // in 'req.user' you will going to get the information about the user
});

app.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  // this is going to destroy our current session
  res.send("GoodBye!");
});

// NOTE:
// after it work successfully we can go the the devoloper option and go to aplication and under cookies we can see that we will have a cookie
// this is a cookie that had been set by express session which is our session id which is allaw us to be loged in if we will delete this then we will have a session and we will be logged out
app.listen(8080, () => {
  console.log("Listening on 8080");
});
