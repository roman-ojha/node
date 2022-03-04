/*
    => npm i socket.io
    => npm i socket.io-client (for the client side)
    Socket IO
        => it will allow us to make connection between a client and server but have that connection persist
            -> in case of fetch or ajax:
                fetch, ajax (request)===> server (response)===> client
                    -> every time we want api we will have to request to the server
            -> but in case of socket io:
                -> we are going to setting up something called a web socket and these web sockets are going to connect to the server but that connection stays open so if i make 10 request to the server through our websocket i only every make one connection because that connection stays open
                -> this is very useful when we have to make a lot of request especially if tey're smaller requests

      
    => On ES6 module:
      import { Server } from "socket.io";
      import dotenv from "dotenv";
      import express from "express";
      import { createServer } from "http";
      dotenv.config();
      const PORT = process.env.PORT;
      const app = express();
      const server = createServer(app);
      const io = new Server(server);

      server.listen(PORT, () => {
        console.log(`starting on ${PORT}`);
      });
*/

// in socket.io also have to admin UI:
// -> npm i @socket.io/admin-ui
// https://socket.io/docs/v4/admin-ui/

const { instrument } = require("@socket.io/admin-ui");
const io = require("socket.io")(3000, {
  cors: {
    //   to connected to the client and to solve the cors policy error
    origin: ["http://localhost:8080", "https://admin.socket.io"],
  },
});
// this is the function and pass it in the port of our server

io.on("connection", (socket) => {
  // when client connect to server it is call this io.on('connection');

  // this is going to be a function that runs every single time a client connects to our server and it's going to give a socket instance for each one of them
  console.log(socket.id);
  //   'socket.id' is the random id that is assign to each person when that connect to our server

  //   socket.on("custom event", (number, string, object) => {
  //     console.log(number, string, object);
  //   });

  socket.on("send-message", (message, room) => {
    console.log(message);

    // now we want to send message to our client
    // io.emit("send-message-client", message);
    // this will send the message to every single socket out there
    // it send the request to all the client include the client that make the request in the first place

    // now here we are passing the room id as well for to pass for the the message with in that room
    if (room === "") {
      // if we don't have a room it means that this message can be able to brodcast to every one
      socket.broadcast.emit(
        "send-message-client",

        // if we want send the message except the client that make the request that we will say
        message
      );
    } else {
      // if we want send message to the spacific room
      socket.to(room).emit("send-message-client", message);
      //   so while using 'to()' this is the broadcast it means that this will send the message to all the use except the use that send the message
    }
  });
  socket.on("join-room", (room, cb) => {
    //   here now we will listen the event to join a room
    socket.join(room);

    cb(`joined ${room}`);
  });

  socket.on("ping", (n) => {
    console.log(n);
  });
});

const userIo = io.of(
  "/user"
  //   we can see that Namespace in UI '/' & '/admin' , we can create our own namespace
  // so every thing that we can do on normal io we can do on this '/user' io
);

userIo.use(
  // this is how we make up different middleware and every middleware is going to take a scket
  (socket, next) => {
    // 'socket' is all the information for the socket we're connecting with and next is just going to be the next middleware

    // now we can access the auth token here
    if (socket.handshake.auth.token) {
      socket.username = getUsernameFromToken(socket.handshake.auth.token);
      next();
    } else {
      // if use didn't pass a token
      next(new Error("Please send token"));
    }
  }
);

function getUsernameFromToken(token) {
  // here we can do what ever that we want to do like get access to the database and check toke in there and authticate the use of any thing
  return token;
}

userIo.on("connection", (socket) => {
  // so to connected to this user namespace we have to go to our client and we have to make connection to it
  console.log("connected to user neamespace with usename " + socket.username);
});

instrument(
  io,
  { auth: false }
  // in instrument we will going to pass the instance of io
  // auth:false we don't care about to auth to get into dashboard
  //   https://admin.socket.io/#/
  //   we have to add url to cors origin list

  //server URL:
  // http://localhost:3000/admin
);
