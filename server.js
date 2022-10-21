// Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

//------- Dependencies importS -----//
const express = require("express");
const connectToDb = require("./config/db");
const todoController = require("./controllers/todosController");
const usersController = require("./controllers/usersController");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const requireAuth = require("./middleware/requireAuth");

// create express app
const app = express();

// configure express app
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

// Connect to database
connectToDb();

//------------- Routing-----------//
// Signup
app.post("/signup", usersController.signup);
// Login
app.post("/login", usersController.login);
// Logout
app.get("/logout", usersController.logout);
// check Auth
app.get("/check-auth", requireAuth, usersController.checkAuth);
// Create todo
app.post("/todos", requireAuth, todoController.createTodo);
// Get all todos
app.get("/todos", requireAuth, todoController.fetchTodos);
// Get single todo
app.get("/todos/:id", requireAuth, todoController.fetchSingleTodo);
// Get single todo
app.put("/todos/:id", requireAuth, todoController.updateTodo);
// Delete
app.delete("/todos/:id", requireAuth, todoController.deleteTodo);

// Start server
app.listen(process.env.PORT);
