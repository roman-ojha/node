/*
  => partials means:
    -> when we used to make a component in react js and when we need that component we used to call it 
    -> partials is the exact same this where you just have to make one hbs file and call that file in another
    -> partials means when we thought that those component which are repetative in the browser then we just have to make another file for that repetative component as a partials and call them
    -> to use partials we have to require 'hbs' module
      -> const hbs=require('hbs');
*/

/*
  -> if we want to use nodemon and whiel save the .hbs file we want to restart the server then we can do this
    ->  nodemon ./index.js -e js,hbs
*/

const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const port = 8080;

const staticPath = path.join(__dirname, "../../public/Class_08");
const partialsPath = path.join(__dirname, "../../views/partials");

app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../../views"));

// here we are registering partials
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("Class_08_index", {
    channelName: "Roman",
  });
});

app.get("/about", (req, res) => {
  res.render("Class_08_about");
});
app.get("/contact", (req, res) => {
  res.render("Class_08_contact");
});

app.listen(port, () => {});
