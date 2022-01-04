/*
    -> npm is a package manager for the JavaScript programming language.
    -> we can go to the official npm website to see and to download the npm package
    -> https://www.npmjs.com/
    -> to us npm module we have to initialize at the root folder by:
        -> npm init 
        -> npm init -y 
    -> then in the root folder it will make package.json
    -> package.jaon store all the package that we will install for the project
    -> example:
        -> we have a package name chalk to install :
            -> npm i chalk (npm install chalk)
    -> after install we can easly be able to see that on the package.json file we have
        -> "dependencies": {
            "chalk": "^4.1.1"
            }
    -> now it means you porject is depende of this  chalk madule
    -> and we got the another folder called 'node_moduels' which store all the code of modules like property and method
*/

const chalk = require("chalk");

// now this will color the font
console.log(chalk.blue("Hello world!"));
console.log(chalk.red("Hello world!"));
// we can go the the website to see all function and property of the chalk module
// https://www.npmjs.com/package/chalk
console.log(chalk.yellow.italic("Hello world!"));
console.log(chalk.blue.underline("Hello world!"));
console.log(chalk.blue.underline.inverse("Hello world!"));
console.log(chalk.green.underline.inverse("Success"));
console.log(chalk.red.underline.inverse("false"));

/*
    -> as same like this we can search 'validator' modules in npm official website 
    -> https://www.npmjs.com/package/validator
    -> this module will check the validation
    -> to install vadiator :
            -> npm i validator (npm install validator)
    -> if package.json have :
            -> "dependencies": {
                "validator": "^13.6.0"
                }  
            -> then it means we have install it 
*/
const validator = require("validator");

var res = validator.isEmail("roman@ojha.com");
console.log(res ? chalk.green.inverse(res) : chalk.red.inverse(res));
