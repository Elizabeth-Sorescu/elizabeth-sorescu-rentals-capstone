import logo from "../../assets/logos/rentals-logo.png";
import "./Signup.scss";
import { useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const formRef = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, phone, email, password, role } = formRef.current;

    let userInput = {
      name: name.value,
      phone: phone.value,
      email: email.value,
      password: password.value,
      role: role.value,
    };

    const createNewUser = async () => {
      let response = userInput;
      // let response = null;

      try {
        response = await axios.post(
          "http://localhost:8080/api/users/register",
          userInput
        );
        setSuccess(true);
        setError("");
        console.log("Signup FE success");
        return response.data;
      } catch (error) {
        console.error(error);
        setSuccess(false);
        setError(error.response.data);
        // return;
        return alert("Please enter required fields.");
      }
    };
    createNewUser();
  };

  return (
    <main className="signup-page">
      <NavLink to="/">
        <div className="rentals-logo">
          <img className="logo" src={logo} alt="rentals Logo" />
        </div>
      </NavLink>
      <p className="slogan">
        Empower Your Rental Journey: Connect, Document, Resolve.
      </p>

      <form id="signup-form" onSubmit={handleSubmit} ref={formRef}>
        <h1 id="heading">Sign up</h1>
        <label>FULLNAME</label>
        <input type="text" name="name" id="name" />

        <label>PHONE</label>
        <input type="text" name="phone" id="phone" />

        <label>EMAIL</label>
        <input type="text" name="email" id="email" />

        <label>PASSWORD</label>
        <input type="text" name="password" id="password" />

        <p>Click one that applies to your role</p>
        <div id="roles">
          <input type="radio" id="landlord" name="role" value="landlord" />
          <label for="landlord">Landlord</label>

          <input type="radio" id="tenant" name="role" value="tenant" />
          <label for="tenant">Tenant</label>
        </div>

        <button type="submit" form="signup-form" value="Signup" id="signup-btn">
          Submit
        </button>
        {success && (
          <div className="signup__message">You registered successfully!</div>
        )}
        {error && <div className="signup__message">{error}</div>}
      </form>
      <p>
        Already have an account? <Link to="/login">LOGIN</Link>
      </p>
    </main>
  );
}

export default Signup;
