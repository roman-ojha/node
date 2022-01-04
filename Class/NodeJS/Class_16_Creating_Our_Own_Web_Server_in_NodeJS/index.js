/*
# Node.js Web server
    -> To access web pages of any web application, you need a web server. The web server will handle all the gttp requests from the web application
    -> e.g IIS is a web server for ASP.NET web application and Apachee is a web server for php or java web applications.
    -> Node.js provides capabilities to create you own web server which will    handle HTTP requests asynchronously. You can use IIS or Apache ot run Node.js web application but it is recommended to use Node.js web server.
*/

/*
    -> The http.createServer() method includes request 
    -> and response parameters which is supplied by Node.js.
    -> The request object can be used to get information about the current HTTP request
        -> e.g., url, request header, and data.
    -> The response object can be used to send a response for a current HTTP request.
    -> if the response from the HTTP server is supposed to be displayed as HTML,
    -> you should include an HTTP header with the correct content type:
*/

// To use the HTTP server and client one must require('http').
const http = require("http");

const server = http.createServer((req, res) => {
  // http.createServer() function will create a server
  res.end("Hello From the others sides");
  // this will response to the client
});

// to listening the request that what request is comming to the server
// so to listen the request we have to give port to for that server
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to the port no 8000");
});
// server.listen("<Port>","<Host name> or <Local Host>","<Callback()> for listening")
