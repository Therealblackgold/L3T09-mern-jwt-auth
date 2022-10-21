// This component is a simple Login form using state provided by the store
import React from "react";
import authStore from "../stores/AuthStore";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const store = authStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await store.login();
    // Navigate to homepage
    navigate("/");
  };

  return (
    //
    <div className="row">
      <div className="col-md-4 d-flex mx-auto">
        <form className="form-control" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={store.loginForm.email}
              onChange={store.handleLoginChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={store.loginForm.password}
              onChange={store.handleLoginChange}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-secondary d-flex mx-auto" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
