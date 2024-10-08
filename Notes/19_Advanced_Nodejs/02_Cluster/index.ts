import express from "express";

const port = 3000;
const app = express();

app.get("/heavy", (req, res) => {
  let total = 0;
  for (let i = 0; i < 50_000; i++) {
    total++;
  }

  res.send(`The result of the CUP intensive task is ${total}\n`);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  console.log(`Worker id=${process.pid}`);
});

// Test the load:  npx loadtest -n <number_of_request> -c <number_of_concurrent_request> -k <url>
// Example: npx loadtest -n 1200 -c 400 -k http://localhost:3000/heavy
// Example: npx loadtest -c 40 --rps 1200 -k http://127.0.0.1:8080/v1/user/category/popular
// --rps = requests per second
