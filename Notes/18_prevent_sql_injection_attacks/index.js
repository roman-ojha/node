import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

const app = express();
const PORT = 8080;
dotenv.config();

// First see './test.md'
const connection = await mysql.createConnection({
  uri: process.env.DATABASE_URL,
  // by default 'mysql2' doesn't support multiple statement means that if query tries to 'DROP TABLE Repository'
  multipleStatements: false, // And it is not recommended to execute multiple statement in 1 query
});

app.get("/", (req, res) => {
  res.json({ msg: "Hello world." });
});

// User can query repository based on the tags
app.get("/repositories/:userQuery", async (req, res) => {
  const { userQuery } = req.params;
  let query = `SELECT * FROM Repository WHERE TAG = '${userQuery}' AND public = 1`;
  [rows] = await connection.query(query);

  // And another thing is rather then placing ES6 template literal into the query we should rather do like this using placeholders
  query = `SELECT * FROM Repository WHERE TAG = ? AND public = 1`;
  const [rows] = await connection.query(query, [userQuery]);
  // Now if use try to query into: /repositories/javascript';--
  // Then sql query would look like this
  // SELECT * FROM Repository WHERE TAG = `javascript';--` DROP TABLE Repository;-- AND public = 1

  res.json(rows);
});

// another thing that we can do is do input validation on a query
app.get("/repositories2/:userQuery", async (req, res) => {
  const { userQuery } = req.params;
  // so we can validate like we will only allow upper case letter, lower case letter. we should not allow 'TAG' to be created using number and special characters
  const onlyLettersPatter = /^[A-Za-z]+$/;
  if (!userQuery.match(onlyLettersPatter)) {
    return res
      .status(400)
      .json({ err: "No special characters and no number, please!" });
  }

  query = `SELECT * FROM Repository WHERE TAG = ? AND public = 1`;
  const [rows] = await connection.query(query, [userQuery]);
  res.json(rows);
});

// query where input meant to be a number
app.get("/repositories/:id", async (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.status(400).json({ err: "Numbers only, please!" });
  }
});

// validation check based on allowed list
app.get("/repositories2/:userQuery", async (req, res) => {
  const { userQuery } = req.params;
  const validTags = ["javascript", "html", "css"];
  if (!validTags.includes(userQuery)) {
    return res.status(400).json({ err: "Valid tags only, please!" });
  }

  query = `SELECT * FROM Repository WHERE TAG = ? AND public = 1`;
  const [rows] = await connection.query(query, [userQuery]);
  res.json(rows);
});

// NOTE: always validate the input query that user have requested with and try to see the statement that it can make on the SQL

app.listen(PORT, () => {
  console.log("App is running");
});
