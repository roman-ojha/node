const path = require("path");
const express = require("express");
const app = express();
const port = 8080;

const staticPath = path.join(__dirname, "../../public/Class_05");

// built in middleware
app.use(express.static(staticPath));
app.get("/", (req, res) => {
  // here we are passing the root HTML which is index.html
  // NOTE: index.html is the root html
  res.send();
});

app.listen(port, () => {});
