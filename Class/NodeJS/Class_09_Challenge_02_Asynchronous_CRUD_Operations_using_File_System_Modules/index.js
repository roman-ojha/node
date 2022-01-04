/*
    # Challenge Time
        1) Create a folder name it Roman
        2) Create a file in it named bio.txt and data into it.
        3) Add more data into the file at the end of the existing data.
        4) Read the data without getting the buffer data at first. 
        5) Rename the file name to mybio.txt
        6) now delete bothe the file and the folder
*/

const fs = require("fs");

// making folder
// fs.mkdir("Roman", (err) => {
//   console.log("Folder is created");
// });

// write file
fs.writeFile(
  "Roman/bio.txt",
  `Name=Roman
gender=male
`,
  (err) => {
    console.log("File is created");
  }
);

// appending data
fs.appendFile(
  "Roman/bio.txt",
  `
id=13
`,
  (err) => {
    console.log("Data is appended");
  }
);

// Reading the data
fs.readFile("Roman/bio.txt", "UTF-8", (err, data) => {
  console.log("Reading data");
  console.log(data);
});

// renamming the file name
fs.rename("Roman/bio.txt", "Roman/mybio.txt", (err) => {
  console.log("Renamming the file name");
});

// deleting the file
fs.unlink("Roman/mybio.txt", (err) => {
  console.log("Deleting the file");
});

// deleting the folder
fs.rmdir("Roman", (err) => {
  console.log("Deleting the folder");
});
