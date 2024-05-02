import React from "react";
import "../PropertyCard/PropertyCard.scss";
import { useNavigate } from "react-router-dom";
import binIcon from "../../assets/icons/bin.svg";
import editIcon from "../../assets/icons/edit1.svg";
import star from "../../assets/icons/star.svg";
// import SinglePropertyDetails from "../SinglePropertyDetails/SinglePropertyDetails";

function PropertyCard({ property, user }) {
  const navigate = useNavigate();

  const currentDate = new Date();

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

  const currentMonthIndex = currentDate.getMonth();

  const currentMonthName = monthNames[currentMonthIndex];

  const handlePropertyClick = () => {
    if (user.role === "landlord") {
      navigate(`/properties/${property.id}`, { state: { user: user } });
    }
    // navigate(`/properties/${property.id}`);
  };
  return (
    <section
      className="property-card"
      onClick={() => handlePropertyClick({ property })}
    >
      <div className="property-card__grp1">
        <div className="property-card__grp1--sub1">
          <div className="property-card__grp1--elem1">
            <p className="property-card__grp1--elem1-type">{property.type}</p>
            <img
              className="property-card__grp1--elem1-star"
              src={star}
              alt="star"
            ></img>
            <p className="property-card__grp1--elem1-rating">
              {property.rating}
            </p>
            <p className="property-card__grp1--elem1-reviews">
              ({property.num_reviews})
            </p>
          </div>
          <h1 className="property-card__grp1--elem2">
            {property.property_name}
          </h1>
        </div>
        <p className="property-card__grp1--sub2">{property.description}</p>
      </div>
      <div className="property-card__grp2">
        <div className="property-card__grp2--icons">
          <img
            className="property-card__del-btn"
            src={binIcon}
            alt="delete icon"
          ></img>
          <img
            className="property-card__ed-btn"
            src={editIcon}
            alt="edit icon"
          ></img>
        </div>
        <div className="property-card__grp2--details">
          <p>{currentMonthName} Rent</p>

          {user.role === "landlord" && (
            <p className="property-card__grp2--details-rent">
              ${property.monthly_rent}
            </p>
          )}
          {user.role === "tenant" && (
            <p className="property-card__grp2--details-rent">
              ${user.monthly_rent}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default PropertyCard;
