import logo from "../../assets/logos/rentals-logo.png";
import "../Signup/Signup.scss";
import { useRef } from "react";
import { NavLink } from "react-router-dom";

function Signup() {
  const formRef = useRef();
  const handleSubmit = () => {
    alert("this is submit btn");
  };
  return (
    <section className="">
      <NavLink to="/">
        <div className="rentals-logo">
          <img className="logo" src={logo} alt="rentals Logo" />
        </div>
      </NavLink>
      <p className="slogan">
        Empower Your Rental Journey: Connect, Document, Resolve.
      </p>
      <h1>Signup</h1>
      <label></label>

      <form id="signup-form" onSubmit={handleSubmit} ref={formRef}>
        <button type="submit" form="signup-form" value="Signup" id="signup-btn">
          Submit
        </button>
      </form>
    </section>
  );
}

export default Signup;
