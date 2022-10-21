/* This component helps control authentication for the app by
only returning child component TodoPage if a user is logged in else redirect/ navigate 
to login page using a useEffect hook to run checkAuth function when the
page loads */
import React from "react";
import { useEffect } from "react";
import authStore from "../stores/AuthStore";
import { Navigate } from "react-router-dom";

function RequireAuth(props) {
  const store = authStore();

  useEffect(() => {
    if (store.loggedIn === null) {
      store.checkAuth();
    }
  }, []);

  if (store.loggedIn === null) {
    return <div>Loading...</div>;
  }

  if (store.loggedIn === false) {
    return <Navigate to="/login"></Navigate>;
  }
  return <div>{props.children}</div>;
}

export default RequireAuth;
