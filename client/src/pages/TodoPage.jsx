/* TodoPage component returns all the components
 that make up the homepage of the app*/
import { useEffect } from "react";
import todoStore from "../stores/todoStore";
import CreateForm from "../components/CreateForm";
import TodoList from "../components/TodoList";
import UpdateForm from "../components/UpdateForm";

const TodoPage = () => {
  const store = todoStore();

  // Calling the fetchTodos function when the app loads
  useEffect(() => {
    store.fetchTodos();
  }, []);

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col">
            <UpdateForm />
            <CreateForm />
            <TodoList />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodoPage;
