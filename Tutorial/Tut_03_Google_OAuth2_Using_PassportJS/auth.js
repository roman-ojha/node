const passport = require("passport");

// this code is copy from official website of passportjs.org and modify it
// http://www.passportjs.org/packages/passport-google-oauth2/
const GoogleStrategy = require("passport-google-oauth2").Strategy;
/*
->  now go to google api credential website
-> https://console.cloud.google.com/projectselector2/apis/credentials?pli=1&supportedpurview=project&authuser=1
-> now go to credentials tab and create credentials
-> and select 'create OAuth client ID'
-> and after that enter the Authorized redirect URLs
-> like: http://localhost:8080/google/callback
-> then copy that url and past that in 'callbackURL'
-> and copy the 'clientID' and 'clientSecret' and past that in here
*/

// in production you must create the env on seprate because these has to be secure
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/google/callback",
      // here whenever the user authenticate successfully its goana brings us back on this 'callbackURL'
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      // in here you would either create and store data in database if that haven't loged in before
      // or you would find one if that had loged in before

      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //       return done(err, user);
      //     });

      // but for this tutorial we will make it simple
      return done(null, profile);
      // here the return 'profile' will get by the google/callback and after that get by successRedirect and filureRedirect
      // if you want to do something behalf of the user, if you wanted to be able to use other google services you can use the 'accessToken' and 'refreshToken' here
    }
  )
);
// last this we want to define here is serializetation and deserializetion of the user

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
