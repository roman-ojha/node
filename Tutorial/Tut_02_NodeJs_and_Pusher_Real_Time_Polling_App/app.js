const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
/*
    -> here we are using pusher for Real time polling Application
    -> https://pusher.com/
    -> and also we have to inclue pusher cdn /pusher.min.js into index.html
        -> https://cdnjs.com/libraries/pusher
    -> for this project we are including jquery CDN ,materialize css ,canvasjs cdn
*/

/*
    -> in package.json in script if we will do this:
        "scripts": {
                "start": "node app.js"
            }
    -> the we can now be able to use npm start app.js to start the app
*/

// DB Config
require("./config/db");

const app = express();

const poll = require("./routes/poll");

// Set public folder
app.use(express.static(path.join(__dirname, "public")));
// here we are connecting the frontend static file with server

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// here body-parser get depricated so we are using express to parse the form data

// Enable CORS
app.use(cors());

app.use("/poll", poll);
// here we are routing '/poll' to 'poll.js' it means now in poll.js if we will use '/' it means '/poll'

const port = 8080;
// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));
