import PropertyCard from "../PropertyCard/PropertyCard";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Properties() {
  const [userPropertyData, setUserPropertyData] = useState([]);
  const { id } = useParams();
  // This useEffect fetches property(ies) data of a user with user's specific Id
  useEffect(() => {
    const fetchPropertiesByUserId = async () => {
      try {
        const respLandlord = await axios.get(
          `http://localhost:8080/api/landlords/${id}/properties`
        );
        setUserPropertyData(respLandlord.data);
        const respTenant = await axios.get(
          `http://localhost:8080/api/tenants/${id}/properties`
        );
        setUserPropertyData(respTenant.data);
        console.log(respLandlord.data);
        console.log(respTenant.data);
      } catch (error) {
        console.error("Error fetching properties of a user:", error);
      }
    };
    fetchPropertiesByUserId();
  }, [id]);

  return (
    <main>
      Properties List:
      {userPropertyData.map((item) => {
        return <PropertyCard key={item.id} item={item} />;
      })}
    </main>
  );
}

export default Properties;
