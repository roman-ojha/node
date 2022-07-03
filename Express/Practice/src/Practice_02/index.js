const express = require("express");
const path = require("path");
const app = express();
const PORT = 8080;

const staticPath = path.join(__dirname, "../../public/Practice_02");
app.use(express.static(staticPath));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../../views"));

app.get("/", (req, res) => {
  res.render("index", {
    name: "Roman Ojha",
  });
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/Practice_02/about.html"));
});

app.listen(PORT, () => {
  console.log("Connection Sucessfull");
});
