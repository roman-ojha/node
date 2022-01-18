/*
    => npm i socket.io
    => npm i socket.io-client (for the client side)
    Socket IO
        => it will allow us to make connection between a client and server but have that connection persist
            -> in case of fetch or ajax:
                fetch, ajax (request)===> server (response)===> clinet
                    -> every time we want api we will have to request to the server
            -> but in case of socket io:
                -> we are going to setting up something called a web socket and these web sockets are going to connect to the server but that connection stays open so if i make 10 request to the server through our websocket i only every make one connection because that connection stays open
                -> this is very useful when we have to make a lot of request especially if tey're smaller requests
*/

const io = require("socket.io")(3000);
// this is the function and pass it in the port of our server

io.on("connection", (socket) => {
  // this is going to be a function that runs every single time a clinet connects to our server and it's going to give a socket instance for each one of them
  console.log(socket.id);
});
