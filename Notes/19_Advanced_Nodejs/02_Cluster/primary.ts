// Explanation of Cluster: https://youtu.be/6lHvks6R6cI?list=PL5Lsd0YA4OMGN86vWiW7O52izu-cTxcS3&t=9
// https://nodejs.org/docs/v20.15.0/api/cluster.html
import cluster from "node:cluster";
import os from "os";
import { dirname } from "path";
import { fileURLToPath } from "node:url";

const cupCount = os.cpus().length; // gives us to number of cpu that you have in your system
console.log(`The total number of CPU: ${cupCount}`);
console.log(`Primary pid=${process.pid}`);

// setting up the primary cluster
cluster.setupPrimary({
  exec: __dirname + "/index",
});

// So, now we will spawning those 'index.js' for 'cupCount' amount of time
for (let i = 0; i < cupCount; i++) {
  cluster.fork();
}

cluster.on("exit", (worker, code, signal) => {
  // this event will get called whenever one of the worker nodes will get exist or killed
  console.log(`Worker ${worker.process.pid} has been killed`);
  console.log("Starting another worker");
  // in that case we will start the new cluster again
  cluster.fork();
});

// We can also run primary node using 'pm2' package
// npx pm2 start <main_file_name>.js
