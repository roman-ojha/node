/*
                        Routes
                        /  |  \
                       /   |   \
                      /    |    \
                     /     |     \
                    /      |      \
               'Home'  'About' 'contact_Us'
                 \        \          /
                  \        \        / 
                   \        |      /   
                    \       |     /     
                     \     |     /    
                        'client' 

-> routing means to route all of the page 
-> it will connect the pages and make a path to go to the paticular pages
*/

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Welcom to my home page</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>Welcom to my about page</h1>");
  // res.status(200).send("<h1>Welcom to my about page</h1>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>Welcom to my contact page</h1>");
});

app.get("/temp", (req, res) => {
  res.send("<h1>Welcom to my temp page</h1>");
});

app.listen(8080, () => {
  console.log("listening");
});
