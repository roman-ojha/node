const fetch = require("node-fetch");
const express = require("express");
const app = express();
const path = require("path");

const staticPath = path.join(__dirname, "../../public/Practice_03");

app.use(express.static(staticPath));

app.get("/", (req, res) => {
  res.send();
});

app.get("/randomApi", async (req, res) => {
  try {
    const response = await fetch(
      "https://random-data-api.com/api/company/random_company"
    );
    const data = await response.json();
    res.send(data);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
});

app.listen(8080, () => {
  console.log("Connection Sucessfull");
});
