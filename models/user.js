const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
