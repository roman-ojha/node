/*
# Node.js Streams
    -> stream.pipe(), the method used to take a readable stream and connect it to a writeable stream
    -> readable.pipe(destination[, options])
    -> by this method while reading the data from the file every single time when the data is reading simultaneously that readed data is streamming to the platform
    -> so we want to read and write the data in same time
    -> we had alrady seen the this process of stremming previously
*/

const fs = require("fs");
const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  // long way to streamming

  //   const rstream = fs.createReadStream("input.txt");
  //   rstream.on("data", (chunkdata) => {
  //     res.write(chunkdata);
  //   });
  //   rstream.on("end", () => {
  //     res.end();
  //   });
  //   rstream.on("error", (err) => {
  //     console.log(err);
  //     res.end("File not found");
  //   });
  // short way to streamming

  const rstream = fs.createReadStream("input.txt");
  // now this function will respond the data in real time
  rstream.pipe(res);
  // in 'pipe()' we have to pass destination where data will fatch so in this case we have to pass 'res'(respond)
});

server.listen(8080, "127.0.0.1");
