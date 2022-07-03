/*
    -> we know that by default express don't give us permission to change the name 'views' folder 
    -> now now we will try to change the name of 'views'
*/

const path = require("path");
const express = require("express");
const app = express();
const port = 8080;

// to include html and css
const staticPath = path.join(__dirname, "../../public/Class_07");
app.use(express.static(staticPath));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../../templates"));
// here we can say that we change the name of the folder 'views' to 'templates'

app.get("", (req, res) => {
  res.render("Class_07_index", {
    channelName: "Roman",
  });
});

// to add another hbs
app.get("/about", (req, res) => {
  res.render("Class_07_about");
});

app.listen(port, () => {});
