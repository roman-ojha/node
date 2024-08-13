/*
    *) Cause of Memory Leaks:
        - Non-Cleared Timeout/Intervals
        - Global Variables
        - Closures
        - Unreferenced nodes
*/

import { EventEmitter } from "events";
import express from "express";
const app = express();
const port = 3000;
const eventEmitter = new EventEmitter();

// global variables
let tasks = [];
// global variables are attached to the root node
// in case of browser 'window'
// in case of nodejs 'global'

app.get("/", (req, res) => {
  // closure with an external variable reference
  tasks.push(function () {
    // the garbage collector will not going to know whether this callback has finished or so it will not going to remove this reference to the variable that is accessing outside
    return req.headers;
  });

  // Also 'tasks' array will be like that even after completion of specific route(controller buf)

  // Huge Array
  const hugeArray = new Array(100000000).fill(req);

  // circular object reference
  req.user = {
    // 'req' is pointing to the original request object
    // But nodejs already knows how to deal with cycle references
    // But it is a bad pattern
    id: 1,
    username: "Inefficient User",
    badObject: req,
    hugeArray,
  };

  //  clear any triggered event
  eventEmitter.on("start", () => {
    console.log("Useless event emitted");
  });

  // like this:
  //   eventEmitter.removeListener('start');

  // clear any setTimeout
  const resWithTimeout = setTimeout(() => {
    res.send("Hello World!");
  });

  clearTimeout(resWithTimeout);
});

// Identify and Analyzing and Debug Memory Leaks: https://youtu.be/YBnN2JpS4hI?list=PL5Lsd0YA4OMGN86vWiW7O52izu-cTxcS3&t=634
