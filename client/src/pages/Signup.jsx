// Signup returns Signup page form and layout
import React from "react";
import SignupForm from "../components/SignupForm";

const Signup = () => {
  return (
    <section className="signup">
      <h3>Signup.</h3>
      <SignupForm />
    </section>
  );
};

export default Signup;
