import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import PropertyTenantsList from "../PropertyTenantsList/PropertyTenantsList";

function SinglePropertyDetails({ handleLogout }) {
  const [propertyData, setPropertyData] = useState([]);
  const [propertyTenants, setPropertyTenants] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchSinglePropertyById = async () => {
      try {
        let resp = await axios.get(
          `http://localhost:8080/api/properties/${id}`
        );
        setPropertyData(resp.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };
    fetchSinglePropertyById();
  }, [id]);

  useEffect(() => {
    const fetchPropertyTenants = async () => {
      try {
        let resp = await axios.get(`http://localhost:8080/api/tenants`);
        const filteredTenants = resp.data.filter(
          (tenant) => tenant.property_id === propertyData.id
        );
        setPropertyTenants(filteredTenants);
      } catch (error) {
        console.error("Error fetching tenants:", error);
      }
    };
    fetchPropertyTenants();
  }, [propertyData]);

  return (
    <main>
      <Header user={propertyData.landlord_id} handleLogout={handleLogout} />
      <div>
        <h1>Single Property Details</h1>
        <p>{propertyData.id}</p>
        <p>{propertyData.landlord_id}</p>
        <p>{propertyData.property_name}</p>
      </div>
      <div className="tenants-list">
        <PropertyTenantsList
          propertyTenants={propertyTenants}
          setPropertyTenants={setPropertyTenants}
        />
      </div>
    </main>
  );
}

export default SinglePropertyDetails;
