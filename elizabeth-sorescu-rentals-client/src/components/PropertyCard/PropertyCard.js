import React from "react";
import "../PropertyCard/PropertyCard.scss";
import { useNavigate } from "react-router-dom";
import binIcon from "../../assets/icons/bin.svg";
import editIcon from "../../assets/icons/edit1.svg";
function PropertyCard({ property }) {
  const navigate = useNavigate();

  // Create a new Date object
  const currentDate = new Date();

  // Define an array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the current month (months are zero-indexed)
  const currentMonthIndex = currentDate.getMonth();

  // Get the month name based on the current month index
  const currentMonthName = monthNames[currentMonthIndex];

  const handlePropertyClick = () => {
    alert();
    // `I am a property in ${property.property_name} clicked! with ${property.id} `
    navigate(`/properties/${property.id}`);
  };
  return (
    <main>
      <div>--------------------------------------</div>
      <div
        className="property-container"
        onClick={() => handlePropertyClick({ property })}
      >
        <p>Type:{property.type}</p>
        <p>Rating: {property.rating}</p>
        <p>Num reviews: {property.num_reviews}</p>
        <h3>Property Name: {property.property_name}</h3>

        <p>Description: {property.description}</p>

        <p>{currentMonthName} Rent</p>
        <p>${property.monthly_rent}</p>
        <img className="del-btn" src={binIcon} alt="delete icon"></img>
        <img className="ed-btn" src={editIcon} alt="edit icon"></img>
      </div>
      <div>--------------------------------------</div>
    </main>
  );
}

export default PropertyCard;
