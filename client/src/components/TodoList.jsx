/* T component returns a list of todos */
import todoStore from "../stores/todoStore";
import Todo from "./Todo";

const TodoList = () => {
  const store = todoStore();

  return (
    <div className="todos-wrapper  col-md-6 d-flex mx-auto shadow">
      {store.todos ? (
        store.todos.map((todo) => <Todo key={todo._id} todo={todo} />)
      ) : (
        <h3>No todos...</h3>
      )}
    </div>
  );
};

export default TodoList;
