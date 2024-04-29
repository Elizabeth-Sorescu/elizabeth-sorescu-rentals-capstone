import "../AddTenantLandlordForm/AddTenantLandlordForm.scss";
import React, { useState, useRef } from "react";

function AddTenantLandlordForm({ onSubmit, propertyTenants }) {
  const [newTenant, setNewTenant] = useState({
    name: "",
    room_location: "",
    monthly_rent: "",
    email: "",
    phone: "",
  });
  const nameInputRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTenant({ ...newTenant, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(propertyTenants);
    // Check if the new tenant's email already exists among existing tenants
    const isDuplicateEmail = propertyTenants.some(
      (tenant) => tenant.email === newTenant.email
    );

    if (isDuplicateEmail) {
      console.error("Tenant with this email already exists.");
      return;
    }

    onSubmit(newTenant);
    console.log(newTenant);
  };

  return (
    <main className="add-tenant">
      <section className="add-tenant__elem">
        <h2>Add New Tenant</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              ref={nameInputRef}
              value={newTenant.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Room Location:
            <input
              type="text"
              name="room_location"
              value={newTenant.room_location}
              onChange={handleChange}
            />
          </label>
          <label>
            Monthly Rent:
            <input
              type="number"
              name="monthly_rent"
              value={newTenant.monthly_rent}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={newTenant.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={newTenant.phone}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  );
}

export default AddTenantLandlordForm;
