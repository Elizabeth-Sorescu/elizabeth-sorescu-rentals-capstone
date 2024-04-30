import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTenantLandlordForm from "../AddTenantLandlordForm/AddTenantLandlordForm";
import "./PropertyTenantsList.scss";
import avatar from "../../assets/icons/avatar-blue.svg";
import chatbox from "../../assets/icons/chat.svg";
import editTenant from "../../assets/icons/edit-icon.svg";
import star from "../../assets/icons/star.svg";
import addIcon from "../../assets/icons/add.svg";

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

  useEffect(() => {
    let errorTimeout, successTimeout;

    // Clear error message after 3 seconds
    if (error) {
      errorTimeout = setTimeout(() => {
        setError("");
      }, 3000);
    }

    // Clear success message after 3 seconds
    if (success) {
      successTimeout = setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }

    // Clear timeouts on component unmount
    return () => {
      clearTimeout(errorTimeout);
      clearTimeout(successTimeout);
    };
  }, [error, success]);

  const handleSubmit = async (newTenant) => {
    const propertyId =
      propertyTenants.length > 0 ? propertyTenants[0].property_id : "";

    // Check if the new tenant's email already exists among property tenants
    const isDuplicateEmail = propertyTenants.some(
      (tenant) => tenant.email === newTenant.email
    );

    if (isDuplicateEmail) {
      setError("Tenant with this email already exists.");
      setSuccess(false);
      return setError("Tenant with this email already exists.");
    }

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
      setError("Failed to submit form. Please try again later.");
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
    if (dateString) {
      const date = new Date(dateString);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    } else {
      return "";
    }
  };

  return (
    <main>
      <div className="tenant-card">
        {propertyTenants.map((tenant) => (
          <section className="tenant-card__info" key={tenant.id}>
            <h1 className="tenant-card__info-subheading">
              Room {tenant.room_location}
            </h1>
            <div className="tenant-card__info-details">
              <img
                className="tenant-card__info-details--elem tenant-card__info-details--img"
                src={avatar}
                alt="user avatar"
              ></img>

              <p className="tenant-card__info-details--elem tenant-card__info-details--name">
                {tenant.name}
              </p>
              <div className="tenant-card__info-details--elem tenant-card__info-details--elem__ratings">
                <img
                  className="tenant-card__info-details--star"
                  src={star}
                  alt="user avatar"
                ></img>
                <p>{tenant.rating}</p>
                <p>({tenant.num_reviews})</p>
              </div>
              <p
                className="tenant-card__info-details--elem tenant-card__info-details--amount"
                style={{ color: paymentStatus[tenant.id] ? "green" : "red" }}
              >
                {tenant.monthly_rent}
              </p>
              <div className="tenant-card__info-details--elem">
                <input
                  type="checkbox"
                  id={`payment-status-${tenant.id}`}
                  onChange={() => handlePaidButtonClick(tenant.id)}
                  checked={paymentStatus[tenant.id] || false}
                />
                <label htmlFor={`payment-status-${tenant.id}`}>Paid</label>
              </div>
              {paymentStatus[tenant.id] ? (
                <p className="tenant-card__info-details--elem">
                  {getFormattedDate(tenant.rent_payment_date)}
                </p>
              ) : (
                <p className="tenant-card__info-details--elem">No Payment</p>
              )}
              <div>
                <img
                  className="tenant-card__info-details--elem tenant-card__info-details--chat"
                  src={chatbox}
                  alt="chat box"
                ></img>
                <img
                  className="tenant-card__info-details--elem tenant-card__info-details--edit"
                  src={editTenant}
                  alt="edit tenant info icon"
                ></img>
              </div>
            </div>
          </section>
        ))}
      </div>
      {/* should I move Add button to SinglePropertyDetails? */}
      {showAddTenantForm ? (
        <AddTenantLandlordForm
          className="add-tenant-form__elem"
          onSubmit={handleSubmit}
          propertyTenants={propertyTenants}
        />
      ) : (
        <div className="landing__add">
          <img
            className="landing__add--btn"
            src={addIcon}
            alt="add button"
            onClick={() => setShowAddTenantForm(true)}
          />
        </div>
      )}
      {/* error message is not rendering */}
      {error && <div className="error-message">{error}</div>}
      {success && (
        <div className="success-message">Tenant added successfully!</div>
      )}
    </main>
  );
}

export default PropertyTenantsList;
