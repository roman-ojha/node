/*
# Events Module
    -> Node.js has a built a built-in module, called "Events",
    -> where you can create, fire, and listen for you own events.
    -> when the user press button or other type of event then this module will help us to make that response possible

    // example 1 -> Registering for the event to be fired only one time using once.
    // Example 2 -> Create an event emitter instance and register a couple of callbacks
    // Example 3 -> Registering for the event with callback parameters
*/

const EventEmitter = require("events");
// here we are creating a class with the help of event
// now from that class we are creating an object
const event = new EventEmitter();

// another way to import event into the project
// const event=require('events');
// const EventEmitter=new event.EventEmitter();

// Example 1 --------------------

// here we are listning the even 'sayMyName'
event.on("sayMyName", () => {
  // 'on' is like addEventListener from javascript
  console.log("My name is Roman");
});

// now to call(emit) event
event.emit("sayMyName");
// here we created the event 'sayMyName' and we emit it
// this event that we are call is the exect same as when we are clicking the button then that event will call same like that this even will also call when some operation will perform

/*
    // we are calling the event after defining because
    // if we will call the event first then event will not work
    -> the concept is quite simple: emiter objects emit named events that cause previously registered issteners to be called.
    -> So, as emmiter object bassically has two main features:
        -> emitting name event's.
        -> Registering and unregistering listener functions.
*/

// Example 2 --------------------

// first
event.on("MyName", () => {
  console.log("My name is Roman");
});
// second
event.on("MyName", () => {
  console.log("My name is Ojha");
});
// third
event.on("MyName", () => {
  console.log("My name is Razz");
});

// call/emit
event.emit("MyName");

// Example 3 --------------------

// listening the event
event.on("checkPage", (statusCode, msg) => {
  // here we are accessing the event parameter to use as per need
  console.log(`Status code is ${statusCode} and the page is ${msg}`);
});

// now here we are calling event by passing some paremeter that we want pass while the event occer
event.emit("checkPage", 200, "ok");
