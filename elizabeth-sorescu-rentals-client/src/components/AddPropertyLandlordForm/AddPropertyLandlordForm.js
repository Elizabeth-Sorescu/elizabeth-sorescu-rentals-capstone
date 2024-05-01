import "../AddPropertyLandlordForm/AddPropertyLandlordForm.scss";
import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import backBtn from "../../assets/icons/back-button.svg";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const AddPropertyLandlordForm = () => {
  const [userPropertyData, setUserPropertyData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        let resp = await axios.get(
          `http://localhost:8080/api/landlords/${id}/properties`
        );
        setUserPropertyData(resp.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, [id]);

  const formRef = useRef();
  const typeInputRef = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [newProperty, setNewProperty] = useState({
    property_name: "",
    street_address: "",
    city: "",
    description: "",
    monthly_rent: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the name is "type", enforce the 9-character limit
    if (name === "type" && value.length > 9) {
      setError("Type should not exceed 8 characters");
      return;
    }

    // If no validation error, clear previous error and update the state
    setError("");
    setNewProperty({ ...newProperty, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      type,
      property_name,
      street_address,
      city,
      description,
      monthly_rent,
    } = formRef.current;

    let newPropertyInput = {
      type: type.value,
      property_name: property_name.value,
      street_address: street_address.value,
      city: city.value,
      description: description.value,
      monthly_rent: monthly_rent.value,
      landlord_id: id,
    };

    // Create new property
    try {
      await axios.post(
        "http://localhost:8080/api/properties",
        newPropertyInput
      );

      setSuccess(true);
      setError("");

      // Clear input fields after the form is submitted
      setNewProperty({
        property_name: "",
        street_address: "",
        city: "",
        description: "",
        monthly_rent: "",
      });
      typeInputRef.current.focus();
    } catch (error) {
      console.error("Failed to submit form:", error);
      setSuccess(false);
      setError(error.response.data);
    }
  };

  useEffect(() => {
    let timeoutId;
    if (success) {
      // Automatically hide the success message after 4 seconds
      timeoutId = setTimeout(() => {
        setSuccess(false);
      }, 4000);
    }

    return () => {
      // Clear the timeout if component unmounts or success state changes
      clearTimeout(timeoutId);
    };
  }, [success]);

  const handleCancel = async (e) => {
    e.preventDefault();
    // Clear input fields after the form is submitted
    setNewProperty({
      property_name: "",
      street_address: "",
      city: "",
      description: "",
      monthly_rent: "",
    });
    typeInputRef.current.focus();
  };
  return (
    <main className="add-property">
      {/* Header is not rendering correct profile info */}
      {/* <Header user={user} handleLogout={handleLogout} /> */}
      <Header />
      <div className="add-property__heading">
        <Link to="/current/user">
          <img
            className="add-property__heading--back-btn"
            src={backBtn}
            alt="back button"
          ></img>
        </Link>
        <h1 className="add-property__heading--label">Add Property</h1>
      </div>

      <form
        className="add-property__form"
        id="new-property-form"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <div className="add-property__form--groups">
          <div className="add-property__form--groups__left">
            <label className="add-property__form--label">Type: </label>
            <input
              className="add-property__form--inputbox"
              type="text"
              name="type"
              ref={typeInputRef}
              value={newProperty.type || ""}
              onChange={handleChange}
            />

            <label className="add-property__form--label">Property Name: </label>
            <input
              className="add-property__form--inputbox"
              type="text"
              name="property_name"
              value={newProperty.property_name || ""}
              onChange={handleChange}
            />

            <label className="add-property__form--label">
              Street Address:{" "}
            </label>
            <input
              className="add-property__form--inputbox"
              type="text"
              name="street_address"
              value={newProperty.street_address || ""}
              onChange={handleChange}
            />
          </div>

          <div className="add-property__form--group__right">
            <label className="add-property__form--label">City: </label>
            <input
              className="add-property__form--inputbox"
              type="text"
              name="city"
              value={newProperty.city || ""}
              onChange={handleChange}
            />

            <label className="add-property__form--label">Description: </label>
            <input
              className="add-property__form--inputbox"
              type="text"
              name="description"
              value={newProperty.description || ""}
              onChange={handleChange}
            />

            <label className="add-property__form--label">Monthly Rent: </label>
            <input
              className="add-property__form--inputbox"
              type="decimal"
              name="monthly_rent"
              value={newProperty.monthly_rent || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="add-property__form--btns">
          <button
            className="add-property__form--btns__elem"
            type="submit"
            form="new-property-form"
            value="AddProperty"
            id="submit-btn"
          >
            Submit
          </button>
          <button
            className="add-property__form--btns__elem add-property__form--btns__elem--cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
        {success && (
          <div className="addProperty__message">
            Successful! You can now view the new property on this
            <Link to="/current/user"> list </Link> or click the back button.
          </div>
        )}

        {error && <div className="add-property__message">{error}</div>}
      </form>

      <Footer />
    </main>
  );
};

export default AddPropertyLandlordForm;
