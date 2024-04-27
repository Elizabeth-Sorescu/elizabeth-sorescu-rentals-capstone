import "./Login.scss";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import logo from "../../assets/logos/rentals-caps-logo1.svg";

function Login() {
  const formRef = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, role } = formRef.current;

    // Validate if email, password, and role are not empty
    if (!email.value || !password.value || !role.value) {
      setError("Please fill out all fields.");
      return;
    }

    //Validate Email is in acceptable format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validate strength of the password
    if (password.value.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    let userInput = {
      email: email.value,
      password: password.value,
      role: role.value,
    };

    const createNewLogin = async () => {
      let response = null;

      try {
        response = await axios.post(
          "http://localhost:8080/api/users/login",
          userInput
        );
        sessionStorage.setItem("token", response.data.token);
        setSuccess(true);
        setError("");

        navigate("/current/user", {
          state: {
            userInput: userInput,
          },
        });
      } catch (error) {
        console.error(error);
        setError(error.response.data);
      }
    };
    createNewLogin();
  };

  return (
    <main className="login-page">
      <NavLink to="/">
        <div className="header-nav__logo">
          <img src={logo} alt="rentals logo" />
        </div>
      </NavLink>
      <form className="login" onSubmit={handleSubmit} ref={formRef}>
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

        <button className="login-btn">Login</button>

        {success && (
          <div className="login__message">You have successfuly logged in!</div>
        )}
        {error && <div className="login__message">{error}</div>}
      </form>
      <p>
        <Link to="/signup">SIGN UP FOR FREE</Link>
      </p>
    </main>
  );
}

export default Login;
