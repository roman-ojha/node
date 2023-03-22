/*
    -> here we will going to create a file called 'requests.rest' which will allwoed us to make rest request and api request to our api for that we need the rest extention
    -> we can use a postman for that as well
*/

require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

// we are going to pass json on app.get we need to make sure that server can handle that
app.use(express.json());
// this just let's us our application use json from the body that get's pass up to it inside or request

const posts = [
  {
    username: "Roman",
    title: "Post 1",
  },
  {
    username: "Ojha",
    title: "Post 2",
  },
];

app.get("/posts", authenticateToken, (req, res) => {
  // here we have a 'middleware' as authenticating user and if the database the user or verify the then it will have to 'user'
  console.log(req.user);
  res.json(posts.filter((post) => post.username === req.user.name));
  //   here we are only sending the request user data by filtering
});

app.post("/login", (req, res) => {
  // Authenticate User here but we will not focus on that

  const username = req.body.username;
  console.log(req.body);
  //   after unsername and password authetication
  //   username and password we want to authenticate and serialize this user with json web token

  //   jwt.sign(<payload>,<Secret_Key>)
  // -> <payload> = what we want to serialize
  // here we want to serialize 'user' so:
  // -> <Secret_Key> = so, in order to srealize them we need some secret key
  //   and realy easy way to create secret value is using the crypt library so:
  //        -> run 'node' in terminal and write:
  //        -> require('crypto').randomBytes(64).toString('hex')
  //        -> then we will get:
  /*        
            -> '904acae6b3fe3bddffcccd5dcc8bfddc4393edff3cc669585119d7b08b99514717928a3c98113a002b99b785316774a81361c74a2a65b7d955e43f67cb2b6dd7'
            -> it will generate the random value every time
            -> now we can use this as the secret key
        -> since we are going to be doing 'refresh_token' letter, let's set up our secret for our refresh token as well
        -> we will generate the another value and put 'secret_key' and 'refresh_token' in .env file
        -> we could add a expiration data to our token since we dont have any way to refresh our token yet we don't want to add any form of epiration date
    */
  const user = { name: username };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  //   now this is our access token
  res.json({ accessToken: accessToken });
  //   we will send the access token as a josn
  // now when we will request to login whatever username we pass up assuming it's authenticated correctly it' going to creat a access token for us and then access token is going to have the user information saved inside of it that's we are doing that our sign here

  // if we will request to 'http://localhost:8080/login' now with passing 'username' then it will create a token and doesn't have any expiration date and that have to user information saved in it so we can access any of our endpoints with this user information=token
});

function authenticateToken(req, res, next) {
  // this function will authenticate Token
  /*
        -> inside of this funciton we need to get the token
        -> and this token is going to come from the header
        -> and we are going to have a header called bearer so:
                -> "Bearer <TOKEN>"
        -> 
  */
  const authHeader = req.headers["authorization"];
  //   here we are getting the 'authorization' header which willhave "Bearer <TOKEN>"
  const token = authHeader && authHeader.split(" ")[1];
  //   here if we have to 'authHeader' the we are spliting the token from the "Bearer" otherwise return undefines
  if (token == null) return res.sendStatus(401);

  //   now we have to valid token we have to varify the token with the 'SECRET_KEY'
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    //   here this will going to have a 'err' or 'user'
    // 'user' is the user object that we have pass while creating the token
    if (err) return res.sendStatus(403);
    // 'err' if token is not valid

    // we have a valid token
    req.user = user;
    // here we are setting a user as our request
    next();
  });
}

app.listen(8080, () => {
  console.log("server started");
});
