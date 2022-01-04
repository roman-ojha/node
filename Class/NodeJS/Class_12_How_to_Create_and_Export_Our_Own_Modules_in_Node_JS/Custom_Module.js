// inside the custom module when we are defining the function
// all those function are private by default
// it means you can't be able to access all function form the module
// to access the module we have to make those function public

const add = (a, b) => {
  return a + b;
};

const sub = (a, b) => {
  return a - b;
};

const mult = (a, b) => {
  return a * b;
};

const name = "roman";

// module.exports = name;
// so this is the way to exports the module
// now, after that any js file can access this module
// and use this function inside there operation

// you are exporting one function then you can export by :
// module.exports = name;

// but if you want to pass many function then you have to pass like this:
module.exports.addtion = add;
module.exports.subtraction = sub;
module.exports.myname = name;
module.exports.multiplication = mult;
// it means now we are passing object so we have to access through an object

// now we don't even have to exprot all those function one by one
// we can export it using object destructuring
// module.exports = { add, sub, name, mult };
