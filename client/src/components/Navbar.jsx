/* This component returns the navigation of the app rendering
 links depending on weather the user is logged in or not */
import React from "react";
import { Link } from "react-router-dom";
import authStore from "../stores/AuthStore";
const Navbar = () => {
  const store = authStore();
  return (
    <nav className="mb-3">
      <h3 className="logo">sMART TODO </h3>

      <ul>
        {store.loggedIn ? (
          <>
            <li className="logo">
              {store.username}
              <i className="bi bi-person-circle"></i>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/signup">Sign up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
