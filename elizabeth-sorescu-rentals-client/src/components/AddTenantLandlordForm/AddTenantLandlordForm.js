import React, { useState, useRef } from "react";
import closeIcon from "../../assets/icons/close.svg";
import axios from "axios";
import "../AddTenantLandlordForm/AddTenantLandlordForm.scss";

function AddTenantLandlordForm({ onSubmitSuccess, handleClose, propertyId }) {
  const [newTenant, setNewTenant] = useState({
    property_id: propertyId,
    name: "",
    room_location: "",
    monthly_rent: "",
    email: "",
    phone: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const nameInputRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTenant({ ...newTenant, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newTenant);
    if (
      !newTenant.name ||
      !newTenant.room_location ||
      !newTenant.monthly_rent ||
      !newTenant.email
    ) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/tenants",
        newTenant
      );

      onSubmitSuccess(response.data);
      setNewTenant({
        name: "",
        room_location: "",
        monthly_rent: "",
        email: "",
        phone: "",
      });
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed to submit form. Please complete fields.");
    }
  };

  const handleCancel = () => {
    setNewTenant({
      name: "",
      room_location: "",
      monthly_rent: "",
      email: "",
      phone: "",
    });
    nameInputRef.current.focus();
    handleClose();
  };

  const handleClear = () => {
    setNewTenant({
      name: "",
      room_location: "",
      monthly_rent: "",
      email: "",
      phone: "",
    });
    setErrorMessage("");
    nameInputRef.current.focus();
  };

  return (
    <section className="add-tenant">
      <div className="add-tenant__heading">
        <h1 className="add-tenant__heading--label">Add Tenant</h1>
        <img
          src={closeIcon}
          alt="close button"
          className="add-tenant__heading--close"
          onClick={handleCancel}
        />
      </div>
      <form className="add-tenant__form" onSubmit={handleSubmit}>
        <label className="add-tenant__form--label">Name:</label>
        <input
          className="add-tenant__form--inputbox"
          type="text"
          name="name"
          ref={nameInputRef}
          value={newTenant.name}
          onChange={handleChange}
        />

        <label className="add-tenant__form--label">Room Location:</label>
        <input
          className="add-tenant__form--inputbox"
          type="text"
          name="room_location"
          value={newTenant.room_location}
          onChange={handleChange}
        />
        <label className="add-tenant__form--label">Monthly Rent:</label>
        <input
          className="add-tenant__form--inputbox"
          type="number"
          name="monthly_rent"
          value={newTenant.monthly_rent}
          onChange={handleChange}
        />
        <label className="add-tenant__form--label">Email:</label>
        <input
          className="add-tenant__form--inputbox"
          type="email"
          name="email"
          value={newTenant.email}
          onChange={handleChange}
        />
        <label className="add-tenant__form--label">Phone(optional):</label>
        <input
          className="add-tenant__form--inputbox"
          type="tel"
          name="phone"
          value={newTenant.phone}
          onChange={handleChange}
        />
        <div className="add-tenant__form--btns">
          <button className="add-tenant__form--btns__elem" type="submit">
            Submit
          </button>
          <button
            className="add-tenant__form--btns__elem add-tenant__form--btns__elem--cancel"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>

        {errorMessage && (
          <div className="add-tenant__form--error-message">{errorMessage}</div>
        )}
      </form>
    </section>
  );
}

export default AddTenantLandlordForm;
