import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTenantLandlordForm from "../AddTenantLandlordForm/AddTenantLandlordForm";
import "./PropertyTenantsList.scss";

function PropertyTenantsList({ propertyTenants, setPropertyTenants }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showAddTenantForm, setShowAddTenantForm] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState({});

  // Set initial payment status based on rent payment date from database
  useEffect(() => {
    const initialPaymentStatus = {};
    propertyTenants.forEach((tenant) => {
      if (tenant.rent_payment_date) {
        initialPaymentStatus[tenant.id] = true;
      }
    });
    setPaymentStatus(initialPaymentStatus);
  }, [propertyTenants]);

  const handleSubmit = async (newTenant) => {
    const propertyId =
      propertyTenants.length > 0 ? propertyTenants[0].property_id : "";

    const newTenantInput = { ...newTenant, property_id: propertyId };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/tenants",
        newTenantInput
      );

      setSuccess(true);
      setError("");

      // Update propertyTenants state with the newly added tenant
      const updatedPropertyTenants = [...propertyTenants, response.data];
      setPropertyTenants(updatedPropertyTenants);

      setShowAddTenantForm(false);
    } catch (error) {
      console.error("Failed to submit form:", error);
      setSuccess(false);
      setError(error.response.data);
    }
  };

  const handlePaidButtonClick = (tenantId) => {
    // Toggle payment status for the corresponding tenant
    setPaymentStatus((prevStatus) => ({
      ...prevStatus,
      [tenantId]: !prevStatus[tenantId],
    }));
  };

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // January is 0
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <main>
      <h1>Tenants List:</h1>
      <div className="tenant-card">
        {propertyTenants.map((tenant) => (
          <div className="tenant-card__info" key={tenant.id}>
            <img src="" alt="user avatar"></img>
            <p> Room {tenant.room_location}</p>
            <p> {tenant.name}</p>
            <img src="" alt="stars rating"></img>
            <p>{tenant.rating}</p>
            <p>({tenant.num_reviews})</p>
            <p>{tenant.message}</p>
            {paymentStatus[tenant.id] && (
              <p className="monthly-payment-date">
                {getFormattedDate(tenant.rent_payment_date)}
              </p>
            )}
            <p
              className="amount"
              style={{ color: paymentStatus[tenant.id] ? "green" : "red" }}
            >
              {tenant.monthly_rent}
            </p>
            <input
              type="checkbox"
              id={`payment-status-${tenant.id}`}
              onChange={() => handlePaidButtonClick(tenant.id)}
              checked={paymentStatus[tenant.id] || false} // Check if payment status is true
            />
            <label htmlFor={`payment-status-${tenant.id}`}>
              Payment Status
            </label>
          </div>
        ))}
      </div>

      {showAddTenantForm ? (
        <AddTenantLandlordForm onSubmit={handleSubmit} />
      ) : (
        <button onClick={() => setShowAddTenantForm(true)}>Add Tenant</button>
      )}

      {success && (
        <div className="success-message">Tenant added successfully!</div>
      )}
      {error && <div className="error-message">{error}</div>}
    </main>
  );
}

export default PropertyTenantsList;
