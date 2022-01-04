const path = require("path");
const express = require("express");
const app = express();
const staticPath = path.join(__dirname, "../../public/Practice_01");

app.use(express.static(staticPath));
app.get("/", (req, res) => {
  res.send();
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/Practice_01/about.html"));
});
app.listen(8080, () => {});
