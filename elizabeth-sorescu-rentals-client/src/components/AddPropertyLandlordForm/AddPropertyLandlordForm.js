import "../AddPropertyLandlordForm/AddPropertyLandlordForm.scss";
import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import backBtn from "../../assets/icons/back-button.svg";
import Header from "../Header/Header";

const AddPropertyLandlordForm = () => {
  const [userPropertyData, setUserPropertyData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // get data from the api using the user data passed as props
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
  const typeInputRef = useRef(); // Create a ref for the Type input
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
      typeInputRef.current.focus(); // Return focus to the Type input
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
    <main className="add-property">
      <section className="add-property__elem">
        <Header />
        <div className="logo">
          <Link to="/current/user">
            <img src={backBtn} alt="back button"></img>
          </Link>
        </div>
        <h2>Add Property</h2>
        <form id="new-property-form" onSubmit={handleSubmit} ref={formRef}>
          <label>
            Type:
            <input
              type="text"
              name="type"
              ref={typeInputRef} // Assign ref to the Type input
              value={newProperty.type || ""}
              onChange={handleChange}
            />
          </label>

          <label>
            Property Name:
            <input
              type="text"
              name="property_name"
              value={newProperty.property_name || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Property Address:
            <input
              type="text"
              name="street_address"
              value={newProperty.street_address || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            City:
            <input
              type="text"
              name="city"
              value={newProperty.city || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={newProperty.description || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Monthly Rent:
            <input
              type="decimal"
              name="monthly_rent"
              value={newProperty.monthly_rent || ""}
              onChange={handleChange}
            />
          </label>
          <button
            type="submit"
            form="new-property-form"
            value="AddProperty"
            id="submit-btn"
          >
            Submit
          </button>
          {success && (
            // &&
            <div className="addProperty__message">
              Successful! You can now view the new property on this
              <Link to="/current/user"> list </Link> or click the back button.
            </div>
          )}

          {error && <div className="add-property__message">{error}</div>}
        </form>
      </section>
    </main>
  );
};

export default AddPropertyLandlordForm;
