/*
    -> here we will learn how to searve static website
    ->To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
    -> express.static(root, [options])
    -> 'root' is the path where we are creating website

    => File Sturcture
    => step 01: make 'src' folder inside the main project folder
    => step 02: make 'public' folder inside the main Project folder
                ->here all the static website will go inside the public folder
    => step 03: make 'css' folder inside the 'public' folder
*/
const path = require("path");
const express = require("express");
const app = express();

/*
    two type of path:
        -> relative : ../../
        -> absolute : an absolute or full path points to the same location is a file system, regardless of the current working directory.
*/

// here we need a public folder path so to do that we can use '__dirname'
console.log(path.join(__dirname, "../../public/Class_04"));
// here '__dirname' will give the exact path of index.js but we have to go to the public folder to use html, css
// so to do that we can use '../../' where in '..' it will go backword by one and in this case we have to go three time to go to the root folder

const staticPath = path.join(__dirname, "../../public/Class_04");

// built-in middleware
app.use(express.static(staticPath));

app.get("/", (req, res) => {
  res.send();
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/Class_04/about.html"));
});

app.listen(8080, () => {
  console.log("listening");
});
