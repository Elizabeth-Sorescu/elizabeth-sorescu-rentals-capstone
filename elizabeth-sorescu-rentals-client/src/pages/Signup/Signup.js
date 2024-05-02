import logo from "../../assets/logos/main-rentals-logo.svg";
import "./Signup.scss";
import React, { useRef, useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const formRef = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [landlordUsers, setLandlordUsers] = useState([]);
  const [tenantUsers, setTenantUsers] = useState([]);

  useEffect(() => {
    const fetchLandlordsAndTenants = async () => {
      try {
        const respLandlordUser = await axios.get(
          "http://localhost:8080/api/landlords"
        );
        setLandlordUsers(respLandlordUser.data);

        const respTenantUser = await axios.get(
          "http://localhost:8080/api/tenants"
        );
        setTenantUsers(respTenantUser.data);
      } catch (error) {
        console.error("Failed to fetch landlord and tenant users:", error);
      }
    };

    fetchLandlordsAndTenants();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, phone, email, password, role } = formRef.current;

    // Validate if all fields are non-empty (phone is optional)
    if (!name.value || !email.value || !password.value || !role.value) {
      setError("Please fill out all fields.");
      setTimeout(() => setError(""), 4000);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      setError("Please enter a valid email address.");
      setTimeout(() => setError(""), 4000);
      return;
    }

    // Validate phone number format
    const phoneRegex = /^\d{10}$/;
    if (phone.value.length > 0 && !phoneRegex.test(phone.value)) {
      setError("Please enter a valid 10-digit phone number.");
      setTimeout(() => setError(""), 4000);
      return;
    }

    // Validate password length
    if (password.value.length < 8) {
      setError("Password must be at least 8 characters long.");
      setTimeout(() => setError(""), 4000);
      return;
    }

    // Check if a new user is already registered on the landlords table
    const isLandlordEmailRegistered = landlordUsers.some(
      (user) => user.email === email.value
    );

    // Check if a new user is already registered on the tenants table
    const isTenantEmailRegistered = tenantUsers.some(
      (user) => user.email === email.value
    );

    if (isLandlordEmailRegistered && isTenantEmailRegistered) {
      setError("This email is registered already.");
      setTimeout(() => setError(""), 4000);
      return;
    }

    try {
      // If email is not registered, proceed with user creation
      const userInput = {
        name: name.value,
        phone: phone.value,
        email: email.value,
        password: password.value,
        role: role.value,
      };

      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        userInput
      );
      setSuccess(true);
      setError("");
      console.log("Registered new user successfully");

      // Reset form fields after successful registration
      formRef.current.reset();

      setTimeout(() => setSuccess(false), 5000);

      return response.data;
    } catch (error) {
      console.error("Failed to submit form:", error);
      setSuccess(false);
      setError(error.response.data);
    }
  };

  return (
    <main className="signup">
      <NavLink to="/">
        <div className="signup__logo">
          <img className="logo" src={logo} alt="rentals Logo" />
        </div>
      </NavLink>

      <form
        className="signup__form"
        id="signup-form"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <h1 className="signup__form--heading">Sign up</h1>

        <div className="signup__form--inputs">
          <div className="signup__form--inputs__textboxes">
            <div className="signup__form--inputs__elem1">
              <div>NAME</div>
              <input
                className="signup__form--input-box"
                type="text"
                name="name"
                id="name"
              />

              <div>PHONE (optional)</div>
              <input
                className="signup__form--input-box"
                type="text"
                name="phone"
                id="phone"
              />
            </div>
            <div className="signup__form--inputs__elem2">
              <div>EMAIL</div>
              <input
                className="signup__form--input-box"
                type="text"
                name="email"
                id="email"
              />

              <div>PASSWORD</div>
              <div>
                <input
                  className="signup__form--input-box"
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
                    className="signup__form--show"
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
                <label className="role__labels" htmlFor="landlord">
                  Landlord
                </label>
              </div>
              <div>
                <input type="radio" id="tenant" name="role" value="tenant" />
                <label className="role__labels" htmlFor="tenant">
                  Tenant
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="signup__form--cta">
          <button
            type="submit"
            form="signup-form"
            value="Signup"
            className="signup__form--btn"
          >
            Submit
          </button>
        </div>
        {success && (
          <div className="signup__form--success-msg">
            You registered successfully! You can now sign in to your account.
          </div>
        )}
        {error && <div className="signup__form--error-msg">{error}</div>}
      </form>
      <p className="signup__login">
        Already have an account?{"  "}
        <Link className="signup__login--link" to="/login">
          LOGIN
        </Link>
      </p>
    </main>
  );
}

export default Signup;
