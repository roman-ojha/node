/*
# Node.js Streams
    -> Streams are objects that let you read data from a source or write data to a destination in continuous fashion. In Node.js, there are four type of streams-

    
    -> Streaming means listening to music of watching video in 'real time', instead of downloading a file to your computer and watching it later
    
    1) Readable - Stream which is used for read operation.
    2) Writable - Stream which is used for write operation.
    3) Duplex - Stream which ca be used for both read and write operation.
    4) Transform - A type of duplex stream where the output is computed based on input.
*/

/*
    -> Each type of Stream is an EventEmitter instance and throws several events at different instance of times. For example, some of the commonly used event are - 

    data - This event is fired when there is data is available to read.
    end - This event fired when there is no more data to read.
    error - This event is fired when there is any error receiving or writing data.
    finish - This even is fired when all the data has been flushed to underlying system
*/

// let's assume that we have the data called 'input.txt' in the server and we want to read the data in the streamming manner

const fs = require("fs");
const http = require("http");

const server = http.createServer();

// because of the event we can use 'on()'
server.on("request", (req, res) => {
  // so here we are just reading the data form the file and sending that data to the client site
  // 1st way to respond the file from the request without stremming

  //   fs.readFile("input.txt", (err, data) => {
  //     if (err) return console.error(err);
  //     res.end(data.toString());
  //   });

  // 2nd way to respond the file with stremming
  const rstream = fs.createReadStream("input.txt");
  // now we are fireing the data througn the data event when there is data is available to read
  // data is the even which will fire when we have data
  rstream.on("data", (chunkdata) => {
    // data - This event is fired when there is data is available to read.
    // '()' those data when we had read form "data" we just have to read then chunk by chunk
    res.write(chunkdata);
    // the data the we are writeing 'write()' will not going to show until we respond it
  });
  // so to respond that we have to do this:
  rstream.on("end", () => {
    res.end();
    //   end - This event fired when there is no more data to read.
  });
  // if there is some error while reading the data then we can do this
  rstream.on("error", (err) => {
    // error - This event is fired when there is any error receiving or writing data.
    console.log(err);
    res.end("File not found");
  });
});

server.listen(8080, "127.0.0.1");
