/*
    # Node.js Core Module
        -> Consider modules to be the same as JavaScript Libraries. A set of functions you want to include in your application.
        -> Node.js has a set of built-in modules which you can use without any further installation.

    -> so if you will go to nodejs default website and you can see all modules in there
    -> https://nodejs.org/dist/latest-v14.x/docs/api/fs.html
    -> to include module
        -> const fs = require("fs");

    
# A common use for the File System module:
    -> Read files
    -> Create files
    -> Update files
    -> Rename files
*/

// require("fs");
// this is the node js module fs=file system
// to include all of those properties and method of that module we have to do this
const fs = require("fs");

// creating a new file Synchronuslly
fs.writeFileSync("read.txt", "Welcome to my channel");
// this will write the data to the file if exist if not it will create it and write the data
// to do that you can type 'node <filename.js>' to open the js and it will perform the task
fs.writeFileSync("read.txt", "roman Ojha,Welcome to my channel ");
// here we will see that this will not append to the end of file

fs.appendFileSync("read.txt", "how are you I am fine Thank you:)");
// now this function will append the new data to the end of file

const buf_data = fs.readFileSync("read.txt");
// this will read the data from the file
console.log(buf_data);
// by doing this we will get the buffer data
/*
<Buffer 72 6f 6d 61 6e 20 4f 6a 68 61 2c 57 65 6c 63 6f 6d 65 20 74 6f 20 6d 79 20 63 68 61 6e 6e 65 6c 20 68 6f 77 20 61 72 65 20 79 6f 75 20 49 20 61 6d 20 ... 16 more bytes>

    -> Node.js includes an additional data type called buffer.
    -> (not avilable in brower's javascript).
    -> Buffer is mainly used to store binary data,
    -> while reading from a file or receiving packets over the networks
*/
org_data = buf_data.toString();
console.log(org_data);
// now converting binary data to the string we can be able to see the original file data easily

//Rename the file
fs.renameSync("read.txt", "read_write.txt");
// this will rename the old file name to new file name
