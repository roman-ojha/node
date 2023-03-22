/*
  => npm install pusher
  // for server side code
  => npm install puhser-js
  // for client side code like reactJS
  // and :
    -> import Pusher form 'pusher-js';
  // no need to include script in html file

*/

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Vote = require("../models/Vote");

const Pusher = require("pusher");

var pusher = new Pusher({
  appId: process.env.APPID,
  key: process.env.KEY,
  secret: process.env.SECRET,
  cluster: process.env.CLUSTER,
  useTLS: true,
});

// here we are using '/' it means we are routing to '/poll'
router.get("/", (req, res) => {
  // sending the data comming from the database to client
  Vote.find().then((votes) => res.json({ success: true, votes: votes }));
});

router.post("/", (req, res) => {
  // here we will save the data to the mongodb
  const newVote = {
    os: req.body.os,
    points: 1,
  };
  new Vote(newVote).save().then((vote) => {
    // after saving the data and after getting response we want to trigger 'pusher.trigger' function where we have to pass the data inside it which will going to retirve in the frontend side
    pusher.trigger("os-poll", "os-vote", {
      // in here we are passing the event
      // by using this trigger function it will now act as the real time application where this trigger function is sending data to the client side and at the client side we are again using 'pusher' to retrive that data
      points: parseInt(vote.points),
      os: vote.os,
    });
    return res.json({ success: true, message: "Thank you for voting" });
  });
});

module.exports = router;
