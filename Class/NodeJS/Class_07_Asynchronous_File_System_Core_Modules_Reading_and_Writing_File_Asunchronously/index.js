const fs = require("fs");

/*
# What is Asynchronous
    -> Asynchrony, in computer programming, refers to the occurrence of events independent of the main program flow and ways to deal with such events.
*/

//creating file Asynchronouslly
// fs.writeFile("<filepath>","<data>",<callback Function>)
fs.writeFile("read.txt", "Today is awesom day ", (err) => {
  console.log("file is created");
  console.log(err);
  // error is just the error if we will get it
});

/*
    -> we pass them a function as a argument - a callback -
    -> that gets called when that task completes.
    -> the callback has an argument that tells you whether the operation completed sucessfully.
    -> Now we need to say what to do when fs.writeFile has completed (even if it's nothing), and start checking for errors.
*/

fs.appendFile("read.txt", "Hello World", (err) => {
  console.log("File is append");
  console.log(err);
});
fs.readFile("read.txt", "UTF-8", (err, data) => {
  // data is the data that we will get through the file
  // this is asynchronous way we so, you have to do like this
  console.log("File is read");
  console.log(data);
  console.log(err);
});
