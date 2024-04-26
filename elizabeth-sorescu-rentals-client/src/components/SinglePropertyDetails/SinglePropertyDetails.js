import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import backBtn from "../../assets/icons/back-button.svg";
import Header from "../Header/Header";
import PropertyTenantsList from "../PropertyTenantsList/PropertyTenantsList";

function SinglePropertyDetails({ property }) {
  const [propertyData, setPropertyData] = useState([]);
  const [tenantsData, setTenantsData] = useState([]);
  const { id } = useParams();
  const [propertyTenants, setPropertyTenants] = useState([]);

  useEffect(() => {
    // get data from the api using the user data passed as props
    const fetchSinglePropertyById = async () => {
      try {
        let resp = await axios.get(
          `http://localhost:8080/api/properties/${id}`,
          propertyData
        );
        setPropertyData(resp.data);
        console.log(propertyData);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchSinglePropertyById();
  }, []);

  useEffect(() => {
    // get data from the api using the user data passed as props
    const fetchAllPropertyTenants = async () => {
      try {
        let resp = await axios.get(
          `http://localhost:8080/api/tenants`,
          tenantsData
        );
        setTenantsData(resp.data);
        console.log(tenantsData);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchAllPropertyTenants();
  }, []);

  //map all tenants data if its tenantsData.property_id matches the propertyData.id
  //then those that matches the propertyData id is put in an array of objects
  useEffect(() => {
    const filteredTenants = tenantsData.filter(
      (tenant) => tenant.property_id === propertyData.id
    );
    setPropertyTenants(filteredTenants);
  }, [tenantsData, propertyData]);
  console.log(propertyTenants);
  return (
    <main>
      <Header />
      <div>
        <h1> This is Single property Details</h1>
        <p> {propertyData.id}</p>
        <p> {propertyData.landlord_id}</p>
        <p> {propertyData.property_name}</p>
      </div>

      <div className="tenant-card">
        <PropertyTenantsList
          propertyTenants={propertyTenants}
          setPropertyTenants={setPropertyTenants}
        />
        {/* {propertyTenants.map((tenant) => {
          return (
            <div>
              <p> {tenant.id}</p>
              <p> {tenant.name}</p>
              <p> {tenant.room_location}</p>
            </div>
          );
        })} */}
      </div>
    </main>
  );
}

export default SinglePropertyDetails;
