import PropertyCard from "../PropertyCard/PropertyCard";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

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
    <main>
      <h1>Rental Properties</h1>
      <p>Click on the property tab to view more info</p>
      {userPropertyData.map((property) => {
        return <PropertyCard key={property.id} property={property} />;
      })}
    </main>
  );
}

export default Properties;
