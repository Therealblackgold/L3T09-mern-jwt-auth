// import dependencies
const Todo = require("../models/todo");

//--------- Create todo ----------//
const createTodo = async (req, res) => {
  try {
    // Get request data
    const { title, body } = req.body;
    if (body) {
      // Create todo wit it
      const todo = await Todo.create({
        title,
        body,
        user: req.user._id,
      });
      // Respond with new todo
      res.status(200).json({
        success: true,
        todo: todo,
        message: "todo created successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

//----------- Get all todos ----------//
const fetchTodos = async (req, res) => {
  // Find the todos
  const todos = await Todo.find({ user: req.user._id });
  // Respond with todos
  res.status(200).json({
    success: true,
    todos,
  });
};

//------------ Get single todo -----------//
const fetchSingleTodo = async (req, res) => {
  // Get id from req params
  const todo_id = req.params.id;
  // Find the todos
  const todo = await Todo.findById({ _id: todo_id, user: req.user._id });
  // Send response
  res.status(200).json({
    success: true,
    todo,
  });
};

//---------- Update a todo ------------//
const updateTodo = async (req, res) => {
  // Get id from req params
  const todo_id = req.params.id;

  // Get data from the rq body
  const { title, body } = req.body;
  // Find and update todo
  await Todo.findOneAndUpdate(
    { _id: todo_id, user: req.user._id },
    { title, body }
  );
  // Find updated todo
  const todo = await Todo.findById(todo_id);
  // Send response
  res.status(201).json({
    success: true,
    todo: todo,
    message: "todo updated successfully",
  });
};

//---------- Delete ------------//
const deleteTodo = async (req, res) => {
  // Get id from req params
  const todo_id = req.params.id;
  // Find and delete todo
  await Todo.deleteOne({ id: todo_id, user: req.user._id });
  // send response
  res.status(200).json({
    success: true,
    message: "todo deleted successfully",
  });
};

module.exports = {
  createTodo,
  fetchTodos,
  fetchSingleTodo,
  updateTodo,
  deleteTodo,
};
