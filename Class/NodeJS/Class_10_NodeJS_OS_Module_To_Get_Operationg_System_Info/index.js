/*
    -> we can now get the information of the OS(operation system) usint node js
    -> the OS module provides operationg system-related utility methods and properties. it can be accessed using:
        -> const os=require("os");
 */
//importing os module in javasaript
const os = require("os");

// to check the architecture of the the hardware and software
console.log(os.arch());

// to check the free memory of the os
const freeMemory = os.freemem();
// value will return in bytes
console.log(`Free Memory: ${freeMemory / 1024 / 1024 / 1024} GB`);

// to check the total memory of the hardware
const totalMemory = os.totalmem();
console.log(`Total Memory ${totalMemory / 1024 / 1024 / 1024} GB`);

// to get host name
console.log(`Host name: ${os.hostname()}`);

// to get to know about os platform
console.log(os.platform());

// to get temp folder directory
console.log(os.tmpdir());

// to get os type
console.log(os.type());

// you can visit the nodejs.org website to get to know all about os module
//https://nodejs.org/dist/latest-v14.x/docs/api/os.html
