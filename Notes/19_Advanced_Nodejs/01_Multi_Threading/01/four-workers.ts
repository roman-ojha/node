import { workerData, parentPort } from "node:worker_threads";

let counter = 0;
for (let i = 0; i < 20_000_000_000 / workerData.thread_count; i++) {
  // dividing task into multiple thread
  counter++;
}

parentPort?.postMessage(counter);
