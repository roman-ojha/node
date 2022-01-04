// now we can be able to make our own module and import that moduel inside the javascript using node js

const Custom_Module = require("./Custom_Module");
// here 'Custom_Module' return object because we have export more then one function and property inside the 'Custom_Module'
const {
  addtion,
  subtraction,
  multiplication,
  myname,
} = require("./Custom_Module");
// here we can also pass as an property so then we don't even have to access through an object
// this is using object destructuring

console.log(Custom_Module);
console.log(typeof Custom_Module);
console.log(Custom_Module.addtion(5, 4));
// now we can be able to access the module function and property here
console.log(Custom_Module.subtraction(8, 4));
console.log(Custom_Module.myname);

// another way to access
console.log(addtion(1, 2));
console.log(subtraction(6, 7));
console.log(multiplication(4, 3));
console.log(myname);
