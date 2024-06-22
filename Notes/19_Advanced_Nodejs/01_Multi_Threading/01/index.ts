import express from "express";
import { Worker } from "node:worker_threads";

const app = express();
const port = process.env.PORT || 3000;

app.get("/non-blocking/", (req, res) => {
  res.status(200).send("This page is non-blocking");
});

app.get("/blocking", async (req, res) => {
  // Here we can see that, when ever we will access this route it will block the main thread and will not allow '/non-blocking/' routes also to access.
  let counter = 0;
  for (let i = 0; i < 20_000_000_000; i++) {
    counter++;
  }
  res.status(200).send(`result is ${counter}`);
});

/*
    *) Working Principle:
        -> The main Node application which is running on the V8 engine and the V8 engine implement the library called 'libuv', the 'libuv' library in node application to spawn some extra hidden threads
        -> In total we have 7 threads including the main threads, 2 of them are reserved for garage collection and four other are response whenever needed. so, the usually respond whenever we have some I/O operations like DB queries when we write or read files and when we have some network data transmissions. so basically when you make request from your node application. 
        -> Explanation: https://youtu.be/MuwJJrfIfsU?list=PL5Lsd0YA4OMGN86vWiW7O52izu-cTxcS3&t=93
*/

// Now for this route it will handle to worker threads because of heavy computation
app.get("/non-blocking-with-thread", async (req, res) => {
  const worker = new Worker("./worker.js");
  // now we have an access to worker

  // now we can listen to specific events
  worker.on("message", (data) => {
    // event occur whenever we will get the message from a thread
    res.status(200).send(`result is ${data}`);
  });

  worker.on("error", (error) => {
    // even occur whenever error happen
    res.status(404).send(`result is ${error}`);
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
