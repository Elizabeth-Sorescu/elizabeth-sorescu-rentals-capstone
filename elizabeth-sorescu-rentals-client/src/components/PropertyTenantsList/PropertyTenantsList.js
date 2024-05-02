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

    if (error) {
      errorTimeout = setTimeout(() => {
        setError("");
      }, 4000);
    }

    if (success) {
      successTimeout = setTimeout(() => {
        setSuccess(false);
      }, 4000);
    }

    return () => {
      clearTimeout(errorTimeout);
      clearTimeout(successTimeout);
    };
  }, [error, success]);

  const handleSubmit = async (newTenant) => {
    const propertyId =
      propertyTenants.length > 0 ? propertyTenants[0].property_id : "";

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

      const updatedPropertyTenants = [...propertyTenants, response.data];
      setPropertyTenants(updatedPropertyTenants);

      setShowAddTenantForm(false);
    } catch (error) {
      console.error("Failed to submit form:", error);
      setSuccess(false);
      setError("Failed to submit form. Please complete fields.");
    }
  };

  const handlePaidButtonClick = (tenantId) => {
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
      <div className="tenant">
        {propertyTenants.map((tenant) => (
          <section className="tenant__info" key={tenant.id}>
            <h1 className="tenant__info--heading">
              Room {tenant.room_location}
            </h1>
            <div className="tenant__info--det">
              <div className="tenant__info--det--icons">
                <img
                  className="tenant__info--det--icons__avatar"
                  src={avatar}
                  alt="user avatar"
                ></img>
                <div className="tenant__info--det--icons__cta">
                  <img
                    className="tenant__info--det--icons__cta--chat"
                    src={chatbox}
                    alt="chat box"
                  ></img>
                  <img
                    className="tenant__info--det--icons__cta--edit"
                    src={editTenant}
                    alt="edit tenant info icon"
                  ></img>
                </div>
              </div>

              <p className="tenant__info--det--name">{tenant.name}</p>

              <div className="tenant__info--det--ratings ">
                <img
                  className="tenant__info--det--ratings__star"
                  src={star}
                  alt="user avatar"
                ></img>
                <p>{tenant.rating}</p>
                <p>({tenant.num_reviews})</p>
              </div>

              <div className="tenant__info--group">
                <div className="tenant__info--group__rent">
                  <p
                    className="tenant__info--det--amount tenant__info--group__elem"
                    style={{
                      color: paymentStatus[tenant.id] ? "green" : "red",
                    }}
                  >
                    ${tenant.monthly_rent}
                  </p>
                </div>
                <div className="tenant__info--group__paystat">
                  <input
                    type="checkbox"
                    id={`payment-status-${tenant.id}`}
                    onChange={() => handlePaidButtonClick(tenant.id)}
                    checked={paymentStatus[tenant.id] || false}
                  />
                  <label
                    className="tenant__info--group__paystat--label"
                    htmlFor={`payment-status-${tenant.id}`}
                  >
                    Paid
                  </label>

                  {paymentStatus[tenant.id] ? (
                    <p className="tenant__info--group__paystat--date">
                      {getFormattedDate(tenant.rent_payment_date)}
                    </p>
                  ) : (
                    <p className="tenant__info--group__paystat--date">
                      No Payment
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {showAddTenantForm ? (
        <AddTenantLandlordForm
          className="add-tenant-form__elem"
          onSubmit={handleSubmit}
          propertyTenants={propertyTenants}
          handleClose={() => setShowAddTenantForm(false)}
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

      {error && <div className="error-message">{error}</div>}
      {success && (
        <div className="success-message">Tenant added successfully!</div>
      )}
    </main>
  );
}

export default PropertyTenantsList;
