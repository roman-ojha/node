/*
    -> JSON stands for JavaScript Object Notation.
    -> JSON is a lightweight format for storing and transporting data.
    -> JSON is often used when data is sent from server to a web page.
*/

const bioData = {
  name: "Roman",
  gender: "Male",
  id: 14,
};

// console.log(bioData.age);

// converting object to json
const jsonData = JSON.stringify(bioData);
// console.log(jsonData);
// by converting the 'bioData' object to JSON
// {"name":"Roman","age":22,"gender":"Male"}

// converting json to object
const objData = JSON.parse(jsonData);
// console.log(objData);

// Task to do
/*
    1) convert to JSON
    2) add to another file
    3) readfile
    4) again convert back to js object
    5) console.log
*/

const fs = require("fs");
// 1)
const jsonFormate = JSON.stringify(bioData);
// 2)
fs.writeFile("./bioData.json", jsonFormate, (err) => {
  console.log("creating json file ");
});
//3)
fs.readFile("./bioData.json", "utf-8", (err, data) => {
  // 4)
  const bioObject = JSON.parse(data);
  // 5)
  console.log(bioObject);
});
