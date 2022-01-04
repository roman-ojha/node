/*
# What is Expreaa.Js
    -> Express.js is a Node.js freamework. it's the most popular framework as of now(the most starred on NPM)
    -> ExpressJS is a web application framework that provieds you with a simple API to build websites, we apps and back ends.
# Why do we acctually need Express.js? How it is useful for us to use with Node.js?
    -> Try to write a small REST API server in plain Node.js (that is, useing only core modules) and then in Express.js The latter will take you 5-10x less time and lines of code
*/

/*
#Installing
    -> $ npm init
    -> Now install Express in the myapp directory and save it in the dependencies list. For example:
    -> if you npm version is greater then 5.0 then you don't have to write --save
        $ npm install express 
        $ npm install express --save
    -> now you wiil going to see in package.json this:
            "dependencies": {
            "express": "^4.17.1"
            }
*/

// Creates an Express application. The express() function is a top-level function exported by the express module.
// here we are requiring the express
const express = require("express");
// here we are creating the express application
const app = express();
// we had alrady seen that we need to import or require a lot of module like 'http' which now because of express we don't even have to require,it means we can easly require 'http' in this express app

/*
    # mostly use function
        a) API
        b) post - create (create a new data)                C
        c) get - read or to get the data from the server    R
        d) put - update                                     U
        e) delete -delete                                   D
*/

// to creating the routing we do this
// app.get("<root>",<callback()>)
// ex: app.get("/",<callback()>)
// "/" -> root -> like: www.youtube.com (homepage)

app.get("/", (req, res) => {
  // req is the request object
  // res is the respond object
  // The callback function has 2 parameter, request(req) and response(res).
  // the request object(req) represents the HTTP request and
  // hs porperties for the request query string, parameters, body,
  // HTTP headers, etc.
  // similarly, the response object represents the HTTP response
  // that the express app sends when it receive an HTTP request.
  /*
    EX: '?' say the query parameters
        https://www.youtube.com/watch?v=HdkmzdyFOyI
       |______________________||____| |___________|
                |                |          |
            'root'          'division' 'key value pare(variable(v)=value(HdkmzdyFOyI))'
  */

  res.send("<h1>Hello from the express</h1>");
});
// for another root:
app.get("/about", (req, res) => {
  res.send("<h1>Hello from about us page</h1>");
});

app.listen(8080, "127.0.0.1", () => {
  console.log("listing the port at 8080");
});
