/*
    =>API is the acronym for Application Programming interface.
    -> which is a software intermediary that allows two applications to talk to each other.
    => Each time you use an app like Facebook, send an instant message, or check the weather on you phone, you're using an API
*/

const fs = require("fs");
const http = require("http");

// but in bellow case when the user refresh the page every time the api is calling every time
// if you want to desable that you can do it like this:
const data = fs.readFileSync(`${__dirname}/userApi.json`, "utf-8");
const objData = JSON.parse(data);

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.write("hello from the home side");
    res.end("hello from the home side end");
  } else if (req.url == "/userapi") {
    /*

    // we are making an Api on the localhost server so '/userapi' url
    fs.readFile(`${__dirname}/userApi.json`, "utf-8", (err, data) => {
      //   res.end(data);

      // to get the data from the api
      const objData = JSON.parse(data);
      //   console.log(objData[0].id);
      res.end(objData[0].name);
    });
    */
    // if you want to check the api that
    // is the api even work or not you can go to the website
    // https://www.postman.com/
    // and check it there

    // when we are working with json file we have to write this
    res.writeHead(200, { "Content-type": "application/json" });
    // this is the Synchronous way
    res.end(`${objData[0].name} ${data}`);
    // so, here now user don't have to call the data every single time
    // after reading data for one time after that user don't even have to call again
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end("<h1>404 error pages. Page doesn't exit</h1>");
  }
});

server.listen("8080", "127.0.0.1", () => {
  console.log("listening");
});
