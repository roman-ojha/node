// now we have url module as well to import we have to use:
// const url = require("url");

const http = require("http");
const server = http.createServer((req, res) => {
  // this will return the current url the user want on the browser right now
  //   console.log(req.url);
  // req.url is the requested url from the user
  if (req.url == "/") {
    // -> "/" means localhost
    // req.url is used to check the url of the current request and based on that it send the response
    // to send a response, first it sets the response header using writeHead() mothod and then writes a string as a response body using write() method.
    // Finally, Node.js web server send the response using end().method.
    // it means until we will use res.end() method server will not going to resposne the request
    // res.write will also write of response the data from the server
    res.write("hello from the home side");
    res.end("hello from the home side end");
  } else if (req.url == "/about") {
    res.write("hello from the aboutUs side");
    res.end("hello from the aboutUs side end");
  } else if (req.url == "/contact") {
    res.write("Hello from the contact side");
    res.end("Hello from the contact side end");
  } else {
    // this will change the status code
    // and if the page type will be 'document' we have to change it to html because this code we are responding is in the form of html
    res.writeHead(404, { "Content-type": "text/html" });

    // this is the error but in default status code will show us 200 rather then 400 so we have to make a status code to 400 to say it is client error

    res.end("<h1>404 error pages. Page doesn't exit</h1>");
  }
});

/*
# HTTP response status codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    -> Informational responses (100–199)
    -> Successful responses (200–299)
    -> Redirects (300–399)
    -> Client errors (400–499)
    -> Server errors (500–599)
*/

server.listen("8080", "127.0.0.1", () => {
  console.log("listening");
});
