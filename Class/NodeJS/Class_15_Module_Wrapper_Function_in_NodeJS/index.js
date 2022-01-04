/*
    -> in nodeJS every file is called as module
    -> all the variable and the function in the these file are in private scope 
*/

const name = "Roman";
// console.log(name);

// Module Wrapper function
(function () {});
/*
    -> so this is the module wrapper function 
    -> when we exicute javascript in nodeJS 
    -> then node will wrap the moduel or code into the module wrapper function
    -> it means when we are writing in javascript EX:
        const name = "Roman";
        console.log(name);
    -> node js will wrap this piece of code into Module_wrapper function Like:
        (function(){
            const name = "Roman";
            console.log(name);
        })
    -> because of that all the variable and the function that we define in the moduel will become pirvate
 */
(function (exports, require, module, __filename, __dirname) {
  // so here we can see we had alrady use 'exports', 'require', 'module' which are the argument
  // and which scope is local
  //   const fs = require("fs");
  const name = "Roman";
  console.log(name);
  //   module.exports = name;
});
// this function is called as IIFE(imediately invoked function expression) in javascript
//and in node module wrapper function

(function () {
  var a = "Roman";
  console.log(a);
})();
// to run code inside IIFE you can use '()' at the last of function

console.log(__dirname);
// this will return directory name
console.log(__filename);
// this will return directory with file name
