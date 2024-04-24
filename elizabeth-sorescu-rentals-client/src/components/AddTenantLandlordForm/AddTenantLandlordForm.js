import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import backBtn from "../../assets/icons/back-button.svg";
import Header from "../Header/Header";

const AddTenantLandlordForm = () => {
  const [tenantData, setTenantData] = useState([]);
  const [propertyData, setPropertyData] = useState([]);

  let { id } = useParams();
  id = propertyData.id;
  console.log(id);
  useEffect(() => {
    // get data from the api using the user data passed as props
    const fetchProperty = async () => {
      try {
        let resp = await axios.get(
          `http://localhost:8080/api/properties/${id}`,
          propertyData
        );
        setPropertyData(resp.data);
        console.log(propertyData);
      } catch (error) {
        console.error("Error fetching aa property:", error);
      }
    };
    fetchProperty();
  }, [id]);

  useEffect(() => {
    // get data from the api using the user data passed as props
    const fetchTenants = async () => {
      try {
        let resp = await axios.get(
          `http://localhost:8080/api/tenants`,
          tenantData
        );
        setTenantData(resp.data);
        console.log(tenantData);
      } catch (error) {
        console.error("Error fetching tenants:", error);
      }
    };
    fetchTenants();
  }, [id]);

  const formRef = useRef();
  const nameInputRef = useRef(); // Create a ref for the name input
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [newTenant, setNewTenant] = useState({
    name: "",
    room_location: "",
    monthly_rent: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTenant({ ...newTenant, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, room_location, monthly_rent, email, phone } = formRef.current;

    let newTenantInput = {
      name: name.value,
      room_location: room_location.value,
      monthly_rent: monthly_rent.value,
      email: email.value,
      phone: phone.value,
      property_id: id,
    };

    // Create new tenant
    try {
      await axios.post("http://localhost:8080/api/tenants", newTenantInput);

      setSuccess(true);
      setError("");

      // Clear input fields after the form is submitted
      setNewTenant({
        name: "",
        room_location: "",
        monthly_rent: "",
        email: "",
        phone: "",
      });
      nameInputRef.current.focus(); // Return focus to the Name input
    } catch (error) {
      console.error("Failed to submit form:", error);
      setSuccess(false);
      setError(error.response.data);
    }
  };

  useEffect(() => {
    let timeoutId;
    if (success) {
      // Automatically hide the success message after 3 seconds
      timeoutId = setTimeout(() => {
        setSuccess(false);
      }, 4000);
    }

    return () => {
      // Clear the timeout if component unmounts or success state changes
      clearTimeout(timeoutId);
    };
  }, [success]);

  return (
    <div>
      <Header />
      <div className="logo">
        <Link to="/current/user">
          <img src={backBtn} alt="back button"></img>
        </Link>
      </div>
      <h2>Add Tenant</h2>
      <form id="new-property-form" onSubmit={handleSubmit} ref={formRef}>
        <label>
          NAME
          <input
            type="text"
            name="name"
            ref={nameInputRef} // Assign ref to the Type input
            value={newTenant.name || ""}
            onChange={handleChange}
          />
        </label>

        <label>
          ROOM LOCATION
          <input
            type="text"
            name="room_location"
            value={newTenant.room_location || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          MONTHLY RENT:
          <input
            type="decimal"
            name="monthly_rent"
            value={newTenant.monthly_rent || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          EMAIL
          <input
            type="text"
            name="email"
            value={newTenant.email || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          PHONE
          <input
            type="text"
            name="phone"
            value={newTenant.phone || ""}
            onChange={handleChange}
          />
        </label>

        <button
          type="submit"
          form="new-tenant-form"
          value="AddTenant"
          id="submit-btn"
        >
          Submit
        </button>
        {success && (
          // &&
          <div className="add-tenant-message">
            Successful! You can now view the newly added tenant on this
            <Link to="/properties/:id"> list </Link> or click the back button.
          </div>
        )}

        {error && <div className="add-tenant-message">{error}</div>}
      </form>
    </div>
  );
};

export default AddTenantLandlordForm;
