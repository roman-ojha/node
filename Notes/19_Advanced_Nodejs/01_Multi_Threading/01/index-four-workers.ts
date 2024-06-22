import express from "express";
import { Worker } from "node:worker_threads";

const app = express();
const port = process.env.PORT || 3000;

// For now we will just going to use 4 thread
const THREAD_COUNT = 4;

function createWorker(): Promise<number> {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./four-workers.js", {
      workerData: {
        thread_count: THREAD_COUNT,
      },
    });

    worker.on("message", (data: number) => {
      resolve(data);
    });

    worker.on("error", (error) => {
      reject(`An Error occur ${error}`);
    });
  });
}

app.get("/non-blocking/", (req, res) => {
  res.status(200).send("This page is non-blocking");
});

app.get("/non-blocking-with-thread", async (req, res) => {
  const worker = new Worker("./worker.ts");
  const workerPromises: Promise<number>[] = [];
  for (let i = 0; i < THREAD_COUNT; i++) {
    workerPromises.push(createWorker());
  }

  const thread_results = await Promise.all(workerPromises); // Promise.all will going to take care of all the promises of 'workerPromises' and wait until all get resolved
  // Here we are separating computation and doing it in parallel

  // now we will just sum all of the result that we got from every thread
  const total =
    thread_results[0] +
    thread_results[1] +
    thread_results[2] +
    thread_results[3];

  res.status(200).send(`result is ${total}`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
