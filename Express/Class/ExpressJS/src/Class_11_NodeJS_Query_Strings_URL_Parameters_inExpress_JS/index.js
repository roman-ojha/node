/*
# What are URL Parameters(Query Strings)?
    -> URL Parameters are pieces of information located in the query string of a URL. The query string is the portion of the URL that follows a question mark. For example:  domain.com/shoes?type=sneakers
        -> https://www.youtube.com/watch?v=crWdh53CYnw
        -> domain.com/shoes?type=sneakers&sort=price_ascending
        
        *) Question Mark(?): This starts the URL parameter (domain.com/shoes?type=sneakers)

        *) Ampersand(&): This separates parameters when you have multiple in one URL (domain.com/shoes?type=sneakers&sort=price_ascending)

        *) Variable Name(type): (or "key") is like the title or label of the parameter (domain.com/shoes?type=sneakers)

        *) Value(sneakers): This is the specific value that the key identifies (domain.com/shoes?type=sneakers). For grammar nerds, it's like the predicate nominative in a sentence. In the sentence "Bagel is my dog", Bagel is like the key/variable name while dog is the value.
*/

const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const port = 8080;

// give the path for the css file
const staticPath = path.join(__dirname, "../../public/Class_10");
const partialsPath = path.join(__dirname, "../../views/partials");

app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../../views"));

// here we are registering partials
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("Class_10_index", {
    channelName: "Roman",
  });
});

app.get("/about", (req, res) => {
  // req.query will return an object
  console.log(req.query);
  console.log(req.query.name);
  // when user will request query stirng like
  // /about?name=pune
  // now we can get what user is trying to get or use in URL as an object like
  // {name:'pune'}
  console.log(req.query.anothername);
  // and we know that '&' is the parameter separater so if use will use this
  // /about?name=mumbai&anothername=pune
  // now we will get { name: 'mumbai', anothername: 'pune' }
  res.render("Class_08_about", {
    username: req.query.name,
  });
});
app.get("/contact", (req, res) => {
  res.render("Class_08_contact", {
    username: req.query.name,
  });
});

app.get("/about/*", (req, res) => {
  res.render("Class_09_404_error", {
    errorcomment: "Opps about us page couldn't be found",
  });
});

app.get("*", (req, res) => {
  res.render("Class_09_404_error", {
    errorcomment: "Opps page couldn't be found",
  });
});

app.listen(port, () => {});
