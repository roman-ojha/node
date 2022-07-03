/*
    -> here we will learn how to send HTML and JSON data as a response
    -> as we had already see to response we do:
        -> app.get('/',(req,res)=>{
            res.send("response");
        })
    -> so, here rather sending stirng no we can be able to send HTML by just writing HTML inside the stirng like:
        -> app.get('/',(req,res)=>{
            res.send("<h1>This is the HTML</h1>");
        })
    -> but this approch is not good when you are sending big website
*/

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.write("<h1>Welcom to my home page</h1>");
  res.write("<h1>Welcom to my home page</h1>");
  res.write("<h1>Welcom to my home page</h1>");
  res.send();
  // res.send() will close the connection
  // if we will not write the res.send() then client expect the res.write() is still avi
});

app.get("/another", (req, res) => {
  // here we can pass HTML by using template literal but these kind of way is not recomended
  res.send(`<h1 style="background-color:brown;"><center>Class 07</center></h1>
        <hr>
        <h2><center>Nested Table:</center></h2>
        <center><table border="1" style="border-color:brown;" style="background-color:beige;">
            `);
});
app.get("/api", (req, res) => {
  // here if we send object then :
  // in bhiend the seen express will stringify the array object or object
  // and it will abutomatically convert to : Content-Type: application/json;
  //   res.send({
  //     id: 1,
  //     name: "Roman",
  //     gender: "male",
  //   });
  res.send([
    {
      id: 1,
      name: "Roman",
      gender: "male",
    },
  ]);
  // we can use .json as well to send the array of object and object
  // and it will convert it to jason
  //   res.json([
  //     {
  //       id: 1,
  //       name: "Roman",
  //       gender: "male",
  //     },
  //   ]);
  /*
    -> res.send() and res.json
    -> the methods are identical when an object or array is passed,
    -> but res.json() will also convert non-objects,
    -> such as null and undefined, which are not valid JSON.
  */
  //   res.json("hello this is not json data");
});

app.listen(8080, () => {
  console.log("listening");
});
