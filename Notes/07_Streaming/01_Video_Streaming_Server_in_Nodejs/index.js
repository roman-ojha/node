// to make the video streaming
// first let us understand the concept behind it:
/*
    -> firstly client will make a request to a server by sending header:
        -> Request Headers{
            Request-URL:http://localhost:8080/video
            Request Method:GET
            Range:bytes 0-
        }
        -> here we are requesting a get method from the starting position of the byte which is 0 byte
    -> now server will response the request by sending the part of the video and with status code '206' =  Partial Content and response header will send:
        -> Response Headers{
            Accept-Ranges: bytes // here that type of data we are returning
            Content-Length:1000001 // how many bytes in the content width header
            Content-Range:bytes 0-1000000/63614462 // the range of bytes and the total number of bytes in the video
            Content-Type: video/mp4 // and here the content type header which is video/mp4 format
        }
        -> now video element will recognize it as the incomplete video because of the headers
        -> and will start playing the video with that it's dewnloaded so far
    -> now as video continues to play it'll request the next chunck and the next chunck until the entire video is buffered into the player
*/

const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");

app.use(cors({ credentials: true }));

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/template/index.html");
// });

app.get("/video", function (req, res) {
  const range = req.headers.range;
  //   here we need the range header so that we can send back to the client that part of the video that we want to response back
  if (!range) {
    res.status(400).send("Requires Range headers");
  }
  const videoPath = "./Video/video01.mp4";
  const videoSize = fs.statSync(videoPath).size;
  //   we have to find the size of the video so that we can use this to tell client how big the file exacually is and to find out of our starting and end point

  //   Parse Range
  //Example: "bytes=32324-"
  //   the range would look something like this when client will request the range
  //   "bytes=<starting bytes> - <ending bytes>"
  //   "bytes=<starting bytes>- " => ending bytes is rest of all the bytes in one chunk in this case

  //   in this case we will going to give 1MB chunck size
  const CHUNCK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  //   now we will parse the starting byte from the range header
  //   firstly we will replace all the non-digit character this the empty string and we will left the number

  //   now we will calculate the ending byte from the starting byte that the client request us
  const end = Math.min(start + CHUNCK_SIZE, videoSize - 1);
  //   this function will return the min size of the given number if the starting point exced the video size then we have to send the end bytes as the video size

  const contentLength = end - start + 1;
  //   this is the content length that we are sending in one chunck

  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    // here we are responding the 'Content-Range' which we are sending in one chunck with the total video size
    "Accept-Ranges": "bytes",
    // This is also another way to say what type of data we're sending back
    "Content-Length": contentLength,
    // now we are sending content lenght header so how may bytes we're going to send back to client
    "Content-Type": "video/mp4",
    // type of file
  };

  res.writeHead(206, headers);
  // now we are writing the response back so that first we write the http status
  //   here we are using '206' it tells the browser that we are sending back partial content this isn't the entire video this is just the video from this starting point to endpoint
  //   and we will also set the headers

  const videoStream = fs.createReadStream(videoPath, { start, end });
  // here we are create a read stream to read the file and we will pass:
  //   'createReadStream(<FielPath>,<starting bytes - end bytes to read>)

  videoStream.pipe(res);
  // so we get the videoStream and then it's got a variable by itself d'esn't really do anything so we have to pipe this stream somewhere and we pipe throught this response object

  //   Cons: the problem of this approche is that the server and the video palyer will now work vary well so it will just request that ever part of the video we are on, and doesn't really considerd about or take into accout what you've already requested

  //   so to solve the problem we can save the data that had already came into client and doen't have to request again to the server to get the chunk of data
});

app.listen(8080, function () {
  console.log("Listening on port 8080!");
});
