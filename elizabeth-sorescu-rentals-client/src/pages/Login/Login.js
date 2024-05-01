import "./Login.scss";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import logo from "../../assets/logos/main-rentals-logo.svg";

function Login() {
  const formRef = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, role } = formRef.current;

    // Validate if email, password, and role are not empty
    if (!email.value || !password.value || !role.value) {
      setError("Please fill out all fields.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    //Validate Email is in acceptable format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      setError("Please enter a valid email address.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    // Validate strength of the password
    if (password.value.length < 8) {
      setError("Password must be at least 8 characters long.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    let userInput = {
      email: email.value,
      password: password.value,
      role: role.value,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        userInput
      );
      sessionStorage.setItem("token", response.data.token);
      setSuccess(true);
      setError("");
      setAuthError(false);

      navigate("/current/user", {
        state: {
          userInput: userInput,
        },
      });
    } catch (error) {
      console.error(error);
      if (error.response.status === 401) {
        setAuthError(true);
        setError("Incorrect email or password.");
      } else {
        setError(error.response.data);
      }

      setTimeout(() => {
        setError("");
        setAuthError(false);
      }, 3000);
    }
  };

  return (
    <main className="login">
      <NavLink to="/">
        <div className="login__logo">
          <img src={logo} alt="rentals logo" />
        </div>
      </NavLink>
      <form className="login__form" onSubmit={handleSubmit} ref={formRef}>
        <h1 className="login__form--heading">Login</h1>
        <div className="login__form--inputs">
          <div className="login__form--inputs__textboxes">
            <div className="login__form--inputs__elem1">
              <div>EMAIL</div>
              <input
                className="login__form--input-box"
                type="text"
                name="email"
                id="email"
              />
            </div>
            <div className="login__form--inputs__elem2">
              <div>PASSWORD</div>
              <div>
                <input
                  className="login__form--input-box"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                />
                <div>
                  <input
                    type="checkbox"
                    id="show-password-checkbox"
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label
                    className="login__form--show"
                    htmlFor="show-password-checkbox"
                  >
                    Show
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="role">
            <p className="role__label">Click a role that applies to you:</p>
            <div className="role__options">
              <div className="role__options--landlord">
                <input
                  type="radio"
                  id="landlord"
                  name="role"
                  value="landlord"
                />
                <label className="roles__label" htmlFor="landlord">
                  Landlord
                </label>
              </div>
              <div>
                <input type="radio" id="tenant" name="role" value="tenant" />
                <label className="roles__label" htmlFor="tenant">
                  Tenant
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="form__cta">
          <button className="form__btn">Login</button>
        </div>
        {success && (
          <div className="login__form--success-msg">
            You have successfuly logged in!
          </div>
        )}
        {error && !authError && (
          <div className="login__form--error-msg">{error}</div>
        )}
        {authError && <div className="login__form--error-msg">{error}</div>}
      </form>
      <p className="signup__link">
        <Link className="signup__link--decor" to="/signup">
          SIGN UP FOR FREE
        </Link>
      </p>
    </main>
  );
}

export default Login;
