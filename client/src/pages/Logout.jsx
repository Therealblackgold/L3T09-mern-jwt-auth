//  Logout runs logout function with useEffect that runs when the page loads
import React from "react";
import { useEffect } from "react";
import authStore from "../stores/AuthStore";

const Logout = () => {
  const store = authStore();
  useEffect(() => {
    store.logout();
  }, []);
  return (
    <div>
      <h3>Login to use sMART TODO</h3>
    </div>
  );
};

export default Logout;
