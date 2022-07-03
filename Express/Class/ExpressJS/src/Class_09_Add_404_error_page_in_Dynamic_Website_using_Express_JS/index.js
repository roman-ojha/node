/*
    -> when the user search url(path) which doesn't exit then 
    -> we have to show 404 error
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
  res.render("Class_09_index", {
    channelName: "Roman",
  });
});

app.get("/about", (req, res) => {
  res.render("Class_08_about");
});
app.get("/contact", (req, res) => {
  res.render("Class_08_contact");
});
// when all of those upper wirten root or path which doesn't match for the user who search it then automatically now serch result will go to '*' path

app.get("/about/*", (req, res) => {
  // now here if user go inside the about page and after that go to the page which doesn't exit then this will impleiment
  res.render("Class_09_404_error", {
    errorcomment: "Opps about us page couldn't be found",
  });
});

// when all of those upper wirten root or path which doesn't match for the user who search it then automatically now serch result will go to '*' path
app.get("*", (req, res) => {
  // we have to pass as an object
  res.render("Class_09_404_error", {
    errorcomment: "Opps page couldn't be found",
  });
});

app.listen(port, () => {});
