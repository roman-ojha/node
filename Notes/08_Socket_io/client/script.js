import io from "socket.io-client";

const socket = io("http://localhost:3000", {
  // io is the function that we can call to get a individual socket
  // to connect to the server we have to spacify the apibase url
  // reconnectionDelayMax: 10000,
  // auth: {
  //   token: "123",
  // },
  // query: {
  //   "my-key": "my-value",
  // },
});

// to check the connection
socket.on("connect", () => {
  // this will listen to any event, we can create our custom event or use event like 'connect'
  // 'connect' event will run when we connect to our server
  displayMessage(`you connected with id: ${socket.id}`);

  // socket.emit(
  //   "custom event",
  //   10,
  //   "hi",
  //   { a: "a" }
  //   // emit will take any custom event that we want and send to the server and we can pass any information that we want

  //   // now we have to listen to the event 'custom event' that we have created into the server and we can get the information that we have pass from the server
  // );
});

// we can listen to the event that server triggered
socket.on("send-message-client", (message) => {
  displayMessage(message);
});

// to connecte to user namespace we will create a user socket
const usersocket = io("http://localhost:3000/user", {
  // if we want to have something like admin namespace that require different credential and different authentication it's realy easy to do with namespace because we can actually connect middleware
  auth: { token: "test" },
  // here now we want to pass the authentication in this case we want to pass a token
});

usersocket.on("connect_error", (error) => {
  // if we have not pass the auth toke information then
  displayMessage(error);
});

const joinRoomButton = document.getElementById("room-button");
const messageInput = document.getElementById("message-input");
const roomInput = document.getElementById("room-input");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const room = roomInput.value;
  if (message === "") return;
  displayMessage(message);
  socket.emit(
    "send-message",
    message,
    // here we are creating an socket.emit event and sending message to the server
    room
    // what if we want to have a private room where we only want to communicate to certain people and we join a room and only get a messages inside a room
    // by default every single user in socket io has there own room and that's just their id so, the single user is in room with themselves with this id
    // so if we want to send the another use we can send it to a room that is their id
    // we are are passing room property
  );

  messageInput.value = "";
});

joinRoomButton.addEventListener("click", () => {
  // what if we want to send the message to multiple people and not to every one this is where id of custom room come in
  const room = roomInput.value;
  socket.emit(
    "join-room",
    room,
    // here we will call the event 'join-room' and we will pass the 'room'
    // now we will listen this event to the server and if we will send the message after joining the room then the message will send to those user who had join the room

    // one additional feature that we can do this this 'socket.on' and 'socket.emit' that we can pass a callback function and this callback function will get called from the server back down to the client
    // NOTE: callback is the last thing that we pass to 'emit'
    (message) => {
      displayMessage(message);
    }
  );
});

function displayMessage(message) {
  const div = document.createElement("div");
  div.textContent = message;
  document.getElementById("message-container").append(div);
}

// so now how socket io handle disconnecting and reconnecting
document.addEventListener("keydown", (e) => {
  if (e.target.matches("input")) return;

  if (e.key === "c") socket.connect();
  // if we will press 'c' key then we want to connect to socket

  if (e.key === "d") socket.disconnect();
  // if we will press 'd' then we want to disconnect socket
});

let count = 0;

setInterval(() => {
  // inside this interval we want to send the save message over and over again
  // socket.emit("ping", ++count);
  // so when we will press d it means that we are offline from the socket and 'emit' the information from the client to server then it will queue the information that we had emit and when we connected by pressing 'c' then all thos queue message will send to the server
  // it means that by default socket io when you disconnect will store all of the information that we have send and then once we have receonnect it'll send all those information at once if we don't want to use this feature then we can use the 'volatile' flag
  socket.volatile.emit("ping", ++count);
}, 1000);
