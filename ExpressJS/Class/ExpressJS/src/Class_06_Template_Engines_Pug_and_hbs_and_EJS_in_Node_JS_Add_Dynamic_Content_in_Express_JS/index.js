/*
    -> if we want to use dynamic data inside the website
    -> ex:
        -> lets say that the project that i have for these ex is facebook login
        -> in this page when i am entering the email and the password
        -> i just want it to see the user who log in inside the page
    -> so, it means to make the dynamic website we have to use:
        -> template engines for Express
    -> we have a module called:
        1) Handelbars = https://www.npmjs.com/package/handlebars
            -> npm i handlebars
            -> to use handelbars much better for express js we have another module:
                1) hbs = https://www.npmjs.com/package/hbs
                    -> npm i hbs
        2) pug = https://www.npmjs.com/package/pug
            -> npm i pug
        3) ejs = https://www.npmjs.com/package/ejs
            -> npm i ejs
    -> these are the modoule which will help us to improve html 
    -> and we can be able to dynamically change the html cotent
    -> we can say that these are html with more power
    -> to install all these module we have to go to root path for this project
*/

/*
# offical defination
    ->A template engine enables you to use static template files in your application. At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client. This approach makes it easier to design an HTML page.
    -> Some popular template engines that work with Express are Pug, Mustache, and EJS. The Express application generator uses Jade as its default, but it also supports several others.

*/

/*
    #criteria to use template engines with express
        1) you must need to have a folder in root directory name called 'views'
            -> and you can create 'index.hbs'file inside the 'views' folder
            -> in that 'index.hbs'file now we can be able to write html
            -> we had already seen that how to serve static wabsite 
            -> but if you want to serve the dynamic website then you have to write html code in hbs
            -> which is the template engine when help use to make a dynamic website
*/

const path = require("path");
const express = require("express");
const app = express();
const port = 8080;

const staticPath = path.join(__dirname, "../../public/Class_06");

// to include css file with the hbs file you have to give the path for that liek this:
// app.use(express.static("public"));
// and you have to run the node server from the root directory if you don't want to do it then you can spacify the directory
app.use(express.static(staticPath));

// to set the view engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../../views"));
// this has to be actally same

// if you are using 'pug' engine then:
// app.set("view engine", "pug");
// if you are using 'ejs' engine then:
// app.set("view engine", "ejs");

// template engine route
// we can use '/' or not it's optional
app.get("/", (req, res) => {
  res.render("Class_06_index", {
    // this is the variable that we use in hbs file because of that now we can be able to change the websit as per our need
    // we are passing as an object
    channelName: "Roman",
  });
  // now here we are using render rather then send
  // and inside the render we have to give name of .hbs which we want to render in the wesite as dynamic website
});

app.listen(port, () => {});
