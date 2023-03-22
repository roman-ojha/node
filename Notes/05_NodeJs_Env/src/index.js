// NOTE: if we are running the app from the root directory and using npm start or npm dev then we have config like this:
// require("dotenv").config();
// here we are oppening all the variable at the first so that if other file need's it then it can access the env easily

// require("dotenv").config({path :""});
// if we want to add path of the variable

/*  
  -> now we can download :
      -> npm i cross-env

  -> and add script in package.json:
      ->  "start": "cross-env NODE_ENV=production node src/index.js",
          "dev": "cross-env NODE_ENV=development nodemon src/index.js"

      -> so to run the production build we can use:
          -> npm start
          -> which will run node src/index.js
      -> and to run development build we can use:
          -> npm run dev
          -> which will run the nodemon as you prefferd
*/

// here we can use .env for the normal purposes

// but for the big application purpose we have to seprete the 'development' variable and the 'production' variable
// for that we have to create a '.env.development' and '.env.production' file and configure as up bellow:
// if (process.env.NODE_ENV === "development") {
//   console.log("development");
//   require("dotenv").config({ path: ".env.development" });
// } else {
//   require("dotenv").config({ path: ".env.production" });
// }

// another method:
// install : npm i env-cmd
// wirte script in package.json
/*
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "env-cmd -f .env.production node src/index.js",
*/
// while running 'node index.js' by this method will get the file .env so we have to spacify it for the production build

const express = require("express");
const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send();
});

app.listen(PORT, () => {
  console.log(`Running Server in ${PORT}`);
});
