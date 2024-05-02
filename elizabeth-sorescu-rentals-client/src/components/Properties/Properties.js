import PropertyCard from "../PropertyCard/PropertyCard";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
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
      <h2 className="properties__name-greetings">Hi, {user.name}!</h2>
      <div className="properties__heading">
        <h1 className="properties__heading--label">Rental Properties</h1>
      </div>

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
