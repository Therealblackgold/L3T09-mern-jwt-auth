/*This file uses zustand to mange todos state
https://www.npmjs.com/package/zustand */

import create from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const todosStore = create((set) => ({
  // declaring todos initial state
  todos: null,

  // declaring create form state
  createForm: {
    title: "",
    body: "",
  },

  // declaring update form state
  updateForm: {
    _id: null,
    title: "",
    body: "",
  },

  //------ FETCH TODOS --------//
  fetchTodos: async () => {
    // fetch todos
    const res = await axios.get("/todos");
    // set state
    set({
      todos: res.data.todos,
    });
  },

  //------ CREATE TODO --------//
  createTodo: async (e) => {
    try {
      e.preventDefault();
      // state values
      const { createForm, todos } = todosStore.getState();
      // create todo
      const res = await axios.post("/todos", createForm);
      // update the state
      set({
        todos: [...todos, res.data.todo],
        createForm: {
          title: "",
          body: "",
        },
      });
      // response
      toast.success(res.data.message);
      console.log(res.data.message);
      // error handling
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  },

  // update create form fields
  updateCreateForm: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        createForm: {
          ...state.createForm,
          [name]: value,
        },
      };
    });
  },

  //------ DELETE TODO --------//
  deleteTodo: async (_id) => {
    try {
      // Delete the todo
      const res = await axios.delete(`/todos/${_id}`);
      const { todos } = todosStore.getState();
      // Filter todos list
      const newTodos = todos.filter((todo) => {
        return todo._id !== _id;
      });
      // Update the sate
      set({
        todos: newTodos,
      });
      toast.success(res.data.message);
      console.log(res.data.message);
      // error handling
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  },

  //------ UPDATE TODO --------//
  updateTodo: async (e) => {
    try {
      e.preventDefault();
      // send the update request
      const {
        updateForm: { _id, title, body },
        todos,
      } = todosStore.getState();
      const res = await axios.put(`/todos/${_id}`, { title, body });
      // update state
      const newTodos = [...todos];
      const todoIndex = todos.findIndex((todo) => {
        return todo._id === _id;
      });
      // response
      newTodos[todoIndex] = res.data.todo;
      // reset state
      set({
        todos: newTodos,
        updateForm: {
          _id: null,
          title: "",
          body: "",
        },
      });
      toast.success(res.data.message);
      console.log(res.data.message);
      // error handling
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  },

  // update form fields
  handleUpdateFieldChange: (e) => {
    const { name, value } = e.target;
    set((state) => {
      return {
        updateForm: {
          ...state.updateForm,
          [name]: value,
        },
      };
    });
  },

  toggleUpdate: ({ _id, title, body }) => {
    // get selected todo state
    set({
      updateForm: {
        title,
        body,
        _id,
      },
    });
  },
}));

export default todosStore;
