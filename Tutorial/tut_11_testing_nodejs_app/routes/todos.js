var express = require("express");
var createError = require("http-errors");
var router = express.Router();

// Database:
const todos = [{ id: 1, name: "Do something", completed: false }];

/* /todos */
router.get("/", function (req, res, next) {
  // here we are passing 'Content-Type' as json
  res.json(todos);
});

router.get("/:id", function (req, res, next) {
  const id = req.params.id;
  const getTodo = todos.find((todo) => todo.id === Number(id));
  if (!getTodo) {
    //  404
    return next(createError(404, "Not Found"));
  }
  return res
    .status(200)
    .json({ name: getTodo.name, completed: getTodo.completed });
});

router.post("/", function (req, res, next) {
  const { body } = req;
  if (typeof body.name !== "string") {
    //   here if name of todo is now string then we will create and error for that
    return next(createError(422, "Validation Error"));
  }
  const newTodo = {
    id: todos.length + 1,
    name: body.name,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

module.exports = router;
