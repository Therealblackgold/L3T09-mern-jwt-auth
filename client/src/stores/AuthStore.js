/*This file uses zustand to mange user state
https://www.npmjs.com/package/zustand */

import create from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const authStore = create((set) => ({
  username: "",
  // declaring logged initial state
  loggedIn: null,

  // declaring login form initial state
  loginForm: {
    email: "",
    password: "",
  },

  // declaring signup form initial state
  signupForm: {
    name: "",
    email: "",
    password: "",
  },

  //------- LOGIN ----------//
  login: async () => {
    try {
      const { loginForm } = authStore.getState();
      const res = await axios.post("/login", loginForm, {
        withCredentials: true,
      });
      // set logged state into true and resetting login form
      set({
        loggedIn: true,
        signupForm: {
          email: "",
          password: "",
        },
        username: loginForm.email,
      });
      // response
      toast.success(res.data.message);
      console.log("login success");
      // error handling
    } catch (error) {
      set({ loggedIn: false });
      toast.error("Unauthorized login");
      console.log("unauthorized login");
    }
  },

  /* handleLoginChange function handles 
  input field changes in the login form */
  handleLoginChange: (e) => {
    const { name, value } = e.target;
    // setting form state to user input
    set((state) => {
      return {
        loginForm: {
          ...state.loginForm,
          [name]: value,
        },
      };
    });
  },

  //------- CHECK AUTH ----------//
  checkAuth: async () => {
    try {
      await axios.get("/check-auth");
      // set state
      set({ loggedIn: true });
      // error handling
    } catch (error) {
      set({ loggedIn: false });
      console.log("access denied");
    }
  },

  //------- SIGNUP ----------//
  signup: async () => {
    try {
      const { signupForm } = authStore.getState();
      const res = await axios.post("/signup", signupForm, {
        withCredentials: true,
      });
      // reset the form state
      set({
        signupForm: {
          name: "",
          email: "",
          password: "",
        },
        username: signupForm.email,
      });
      // response
      toast.success(res.data.message);
      console.log("signup success");
      // error handling
    } catch (error) {
      set({ loggedIn: false });
      toast.error("signup failed");
      console.log("signup failed");
    }
  },

  /* handleSignupChange function handles 
  input field changes in the signup form */
  handleSignupChange: (e) => {
    const { name, value } = e.target;
    // setting form state to user input
    set((state) => {
      return {
        signupForm: {
          ...state.signupForm,
          [name]: value,
        },
      };
    });
  },

  //------- LOGOUT ----------//
  logout: async () => {
    try {
      const res = await axios.get("/logout");
      // set state
      set({ loggedIn: false, username: "" });
      // response
      toast.success(res.data.message);
      console.log("logout success");
      // error handling
    } catch (error) {
      toast.error("Something went wrong");
      console.log("failed logging out");
    }
  },
}));

export default authStore;
