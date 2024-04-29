import PropertyCard from "../PropertyCard/PropertyCard";
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import backBtn from "../../assets/icons/back-button.svg";
import "./Properties.scss";

function Properties({ user }) {
  const [userPropertyData, setUserPropertyData] = useState([]);
  const { id } = useParams();
  let userData = user;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        let resp;
        if (userData.role === "landlord") {
          resp = await axios.get(
            `http://localhost:8080/api/landlords/${userData.id}/properties`
          );
        } else if (userData.role === "tenant") {
          resp = await axios.get(
            `http://localhost:8080/api/tenants/${userData.id}/properties`
          );
        }
        setUserPropertyData(resp.data);
        return userData;
      } catch (error) {
        console.log(id);
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, [userPropertyData, userData, id, userData.role]);

  return (
    <section className="properties">
      <div className="properties__heading">
        <div className="logo">
          <Link to="/current/user">
            <img
              className="properties__heading--back-btn"
              src={backBtn}
              alt="back button"
            ></img>
          </Link>
        </div>

        <h1 className="properties__heading--label">Rental Properties</h1>
      </div>
      <h2 className="properties__name-greetings">Hi {user.name}!</h2>
      <p className="properties__label">
        Click on a property tab to view more information.
      </p>
      {userPropertyData.map((property) => {
        return <PropertyCard key={property.id} property={property} />;
      })}
    </section>
  );
}

export default Properties;
