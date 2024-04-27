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

    // Validate if all fields are non-empty
    if (
      !name.value ||
      !phone.value ||
      !email.value ||
      !password.value ||
      !role.value
    ) {
      setError("Please fill out all fields.");
      return;
    }

    //Validate Email is in acceptable format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validate phone number with 10-digit format
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone.value)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    // Validate strength of the password
    if (password.value.length < 8) {
      setError("Password must be at least 8 characters long.");
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
      setError("This email is already registered.");
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

      return response.data;
    } catch (error) {
      console.error("Failed to submit form:", error);
      setSuccess(false);
      setError(error.response.data);
    }
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
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
          />
          <input
            type="checkbox"
            id="show-password"
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="show-password">Show Password</label>
        </div>

        <p>Click one that applies to your role</p>
        <div id="roles">
          <input type="radio" id="landlord" name="role" value="landlord" />
          <label htmlFor="landlord">Landlord</label>

          <input type="radio" id="tenant" name="role" value="tenant" />
          <label htmlFor="tenant">Tenant</label>
        </div>

        <button type="submit" form="signup-form" value="Signup" id="signup-btn">
          Submit
        </button>
        {success && (
          <div className="signup__message">
            You registered successfully! You can now sign in to your account.
          </div>
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
