// This component is a simple Signup form using state provided by the store
import React from "react";
import { useNavigate } from "react-router-dom";
import authStore from "../stores/AuthStore";
import { toast } from "react-toastify";

const SignupForm = () => {
  const navigate = useNavigate();
  const store = authStore();

  const handleSignup = async (e) => {
    e.preventDefault();
    await store.signup();
    if (
      !store.signupForm.name ||
      !store.signupForm.email ||
      !store.signupForm.password
    ) {
      toast.error("all fields required");
    }
    if (
      store.signupForm.name &&
      store.signupForm.email &&
      store.signupForm.password
    ) {
      // Navigate to homepage
      navigate("/login");
    }
  };
  return (
    <div className="row">
      <div className="col-md-4 d-flex mx-auto">
        <form className="form-control" onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={store.signupForm.name}
              onChange={store.handleSignupChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={store.signupForm.email}
              onChange={store.handleSignupChange}
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
              value={store.signupForm.password}
              onChange={store.handleSignupChange}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-secondary  d-flex mx-auto" type="submit">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
