import React, { useState, useRef, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import backBtn from "../../assets/icons/back-button.svg";
import Header from "../Header/Header";

const AddPropertyForm = ({ user }) => {
  const [userPropertyData, setUserPropertyData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(id);

  useEffect(() => {
    // get data from the api using the user data passed as props
    const fetchProperties = async () => {
      try {
        let resp = await axios.get(
          `http://localhost:8080/api/landlords/${id}/properties`
        );
        setUserPropertyData(resp.data);
        console.log(resp.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, [id]);

  const formRef = useRef();
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
    setNewProperty({ ...userPropertyData, ...newProperty, [name]: value });
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
      landlord_id: id, // Include landlord_id in form data so it would take automatically landlord's id as input
    };

    // create new property
    try {
      const response = await axios.post(
        "http://localhost:8080/api/properties",
        newPropertyInput
      );
      console.log("Form submitted successfully");
      setSuccess(true);
      setError("");
      setNewProperty(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to submit form:", error);
      setSuccess(false);
      setError(error.response.data);
    }
  };

  return (
    <div>
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
        {success &&
          // && (
          //     <div className="addProperty__message">
          //       Successfully added new property!
          //     </div>
          //   )
          navigate(`/current/user`)}
        {error && <div className="add-property__message">{error}</div>}
      </form>
    </div>
  );
};

export default AddPropertyForm;
