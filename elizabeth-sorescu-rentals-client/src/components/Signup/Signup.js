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

      <form id="signup-form" onSubmit={handleSubmit} ref={formRef}>
        <section id="input">
          <h1 id="input__heading">Signup</h1>
          <label>NAME</label>
          <input id="input__name" />
          <label>PHONE</label>
          <input id="input__phone" />
          <label>EMAIL</label>
          <input id="input__email" />
          <label>PASSWORD</label>
          <input id="input__password" />
          <p>Click one that applies to your role</p>
          <input
            type="radio"
            id="input__landlord"
            name="landlord"
            value="landlord"
          />
          <label for="landlord">Landlord</label>
          <input type="radio" id="input__tenant" name="tenant" value="tenant" />
          <label for="tenant">Tenant</label>
        </section>
        <button type="submit" form="signup-form" value="Signup" id="signup-btn">
          Submit
        </button>
      </form>
    </section>
  );
}

export default Signup;
