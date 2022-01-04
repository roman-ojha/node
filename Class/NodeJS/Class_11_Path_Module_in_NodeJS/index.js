/*
    -> The path module proveides utilities for working with file and directory paths. it can be accessed useing:
        -> const path = require('path');
*/
// this will import path module
const path = require("path");

// this will return which directory we are working on right now
console.log(
  path.dirname(
    "E:/Programming/Web_Development/NodeJS/Class/NodeJS/Class_11_Path_Module_in_NodeJS/index.js"
  )
);

// now we can be able to find the extension name of the file
console.log(
  path.extname(
    "E:/Programming/Web_Development/NodeJS/Class/NodeJS/Class_11_Path_Module_in_NodeJS/index.js"
  )
);

// it will return the name of the file that you are working on right now
console.log(
  path.basename(
    "E:/Programming/Web_Development/NodeJS/Class/NodeJS/Class_11_Path_Module_in_NodeJS/index.js"
  )
);

// The path.parse() method returns an object whose properties represent significant elements of the path
console.log(
  path.parse(
    "E:/Programming/Web_Development/NodeJS/Class/NodeJS/Class_11_Path_Module_in_NodeJS/index.js"
  )
);

// now we can be able to get the name from the parse object
const fileName = path.parse(
  "E:/Programming/Web_Development/NodeJS/Class/NodeJS/Class_11_Path_Module_in_NodeJS/index.js"
);
console.log(fileName.name);
