const http=require('http');
const exportFactorial=require('./Module_01')

const server=http.createServer((req,res)=>{
    res.write(`<h1>Hello there :) ${req.url} </h1> ${exportFactorial(7)}`);
    res.end();
})

server.listen(8080,"127.0.0.1",()=>{})