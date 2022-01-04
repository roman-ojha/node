const mongoose = require('mongoose');
const keys = require('./keys');

// Map global promises
mongoose.Promise = global.Promise;
// Mongoose Connect
mongoose
  .connect(process.env.DATABASE,{
    
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
