/* Todo component returns the layout for each todo */
import React from "react";
import todoStore from "../stores/todoStore";

const Todo = ({ todo }) => {
  const store = todoStore((store) => {
    return { deleteTodo: store.deleteTodo, toggleUpdate: store.toggleUpdate };
  });

  return (
    <div className="todo col-5-md">
      <h4>{todo.title}</h4>
      <p>{todo.body}</p>
      <button
        className="btn btn-secondary"
        onClick={() => store.toggleUpdate(todo)}
      >
        Update
      </button>
      <button
        className="btn btn-danger"
        onClick={() => store.deleteTodo(todo._id)}
      >
        Delete
      </button>
    </div>
  );
};

export default Todo;
