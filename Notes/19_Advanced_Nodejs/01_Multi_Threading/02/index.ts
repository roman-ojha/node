// https://nodejs.org/docs/v20.15.0/api/worker_threads.html#worker-threads
import {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} from "node:worker_threads";

if (isMainThread) {
  function sum(a: number, b: number) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: {
          a: a,
          b: b,
        },
      });
      worker.on("message", resolve);
      worker.on("error", reject);
      worker.on("exit", (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
      console.log(worker.threadId);
    });
  }
  (async () => {
    const sumOfTwoNumber = sum(1, 2);
    console.log(await sumOfTwoNumber);
  })();
} else {
  const data: { a: number; b: number } = workerData; // getting worker data
  console.log(data);
  // If this thread is a Worker, this is a MessagePort allowing communication with the parent thread. Messages sent using parentPort.postMessage() are available in the parent thread using worker.on('message'), and messages sent from the parent thread using worker.postMessage() are available in this thread using parentPort.on('message').
  parentPort?.postMessage(data.a + data.b);
}
