const fs = require("fs");

// Synchronous Programming
fs.writeFileSync("write.txt", "This is the Synchronous data");
const data = fs.readFileSync("Write.txt", "utf-8");
console.log(data);
console.log("In Synchronous:  After the data");
// here in Synchronous first the 'data' print only after that 'after the data' will print
// it means the execution of the code when the one code will complete then other code will execute

// Asynchronous Programming
fs.writeFile("Write_Async.txt", "This is the Asynchronous data", (err) => {
  console.log("File is wirte");
});
fs.readFile("Write_Async.txt", "utf-8", (err, data) => {
  console.log(data);
});
console.log("In Asynchronous: After the data");
// here first 'In Asynchronous: After the data' this will perform while doing Asynchronous operation
