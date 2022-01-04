/*
  => now here we will going to implement refressh tokens which allow us to acutally take our authentication server and move it outside of our other third server so we can have one server which handles all of our creation of tokens deletion of toiens and refreshen of token and another server which handles only our spacific use case of geting post saving post all of our different API related tasks but not authentication
*/

/*
    -> so let's just assumed that 'server.js' is the server only for authetication not for another api request
    -> and 'server2.js' is for that
    -> right now when we are creating a token it has no expiration date which means any one with access to that token will have forever access to that user account and they can just constantly make request as if they where that user as long as they have that access token
    -> it's very difficult to secure that because they just have infinite forever access it'd be like giving up your api key when we are accessing an api the usr just now have access forver
    -> the idea of the refresh token is that you save the refresh token in a safe spot and then you normal access tokens have a very shot expiration date
    -> so if someone get's access to your access token they only have access to you account for maybe a few minutes before the access is revoked and then user must user the refresh token to get a new token

*/

require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());

let refreshTokens = [];

app.post("/token", (req, res) => {
  // now we are are making a post request for to get the refresh token
  const refreshToken = req.body.token;
  /*
    => where we will get the refresh token to to this server here and we need to user that refresh token and checked to see if we already have a refresh token that exist for that
    -> normally we would want to store our refresh tokens in our database or some form of redis cache but but for our use case we are going to store them locally in a variable 
    -> so now we just have to check if that token actually exist
  */
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  // so here we have to check wheter database 'refreshTokens' include the token that we got sent to us or not

  // so if the get all the way pass all those checks we can actually varify this refresh token so we can just say
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    // and here we will going to have an error as well as our user object being returned inside this function
    if (err) return res.sendStatus(403);

    // now we can create a accessToken
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
});

// so now how we acctually deauthenticate aour refresh token because right now forever and ever and ever users just request the '/token' and create a infinite access token for users no matter what as long as they have that refresh token they can do that so in order to prevent this we need to have some form of delete function
app.delete("/logout", (req, res) => {
  // this is going to allow us to do is accutally delete those refresh tokens
  // normally we have to delete those from our database but right now we are them in variable
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  // here we are deleting the token form the database
  res.sendStatus(204);
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  console.log(req.body);
  const user = { name: username };
  const accessToken = generateAccessToken(user);
  // so it's means that we are generating the access token but it will expire in '15s' so:
  // we need to create arefresh token
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  // we don't have to put a expiration date for the refresh token we are going to manually handle the expiration of these refresh tokens and we don't want JWT to do that for us
  // so every time when we are creating a refresh token here we want to set our refresh tokens in database
  refreshTokens.push(refreshToken);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "152",
  });
  // 'expirationIn' will have to expire date of that 'accessToken'
}

app.listen(4000, () => {
  console.log("server started");
});
