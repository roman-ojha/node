import { parentPort } from "node:worker_threads";

let counter = 0;
for (let i = 0; i < 20_000_000_000; i++) {
  counter++;
}

parentPort?.postMessage(counter);
// using the Post message you will communicate with your main thread
