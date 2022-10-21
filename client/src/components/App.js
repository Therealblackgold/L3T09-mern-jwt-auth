import React from "react";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import TodoPage from "../pages/TodoPage";
import Signup from "../pages/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequireAuth from "./RequireAuth";

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-center" />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <TodoPage />
            </RequireAuth>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
