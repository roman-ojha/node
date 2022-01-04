/*
#Challenge Time :
    1) Create a folder name it Roman
    2) Create a file in it named bio.txt and data into it.
    3) Add more data into the file at the end of the existing data.
    4) Read the data without getting the buffer data at first. (file encoding)
    5) Rename the file name to mybio.txt
    6) now delete bothe the file and folder
*/

/*
# CRUD
    -> Create
    -> Update
    -> Read
    -> Delete
*/
const fs = require("fs");

// Through synchronous
// Making folder
// fs.mkdirSync("Roman");

// Making file and writing data
fs.writeFileSync(
  "Roman/bio.txt",
  `
Name:Roman
gender: male`
);

// appending data to the same file
fs.appendFileSync(
  "Roman/bio.txt",
  `
  id: 76
`
);

//Reading the file
console.log(fs.readFileSync("Roman/bio.txt").toString());

// if here no encoding is specified, the the raw buffer is returned
// encoding the file usint 'UTF-8' to read
/*
# What is 'UTF-8'?
    -> a character endoding capable of encoding all possible characters(called code point)in unicode.
    -> code unit is 8-bit
    -> use one to four code units to encode Unicode
*/
let encode_data = fs.readFileSync("Roman/bio.txt", "utf-8");
console.log(encode_data);

// Renaming the file name
fs.renameSync("Roman/bio.txt", "Roman/myBio.txt");

//Deleting the file and folder
// file
fs.unlinkSync("Roman/myBio.txt");
// folder
fs.rmdirSync("Roman");
