const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
