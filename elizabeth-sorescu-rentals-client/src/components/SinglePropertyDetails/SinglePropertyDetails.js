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

///////////////////////////////////////////////////////
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// // import backBtn from "../../assets/icons/back-button.svg";
// import Header from "../Header/Header";
// import PropertyTenantsList from "../PropertyTenantsList/PropertyTenantsList";

// function SinglePropertyDetails({ handleLogout }) {
//   const [propertyData, setPropertyData] = useState([]);
//   const [tenantsData, setTenantsData] = useState([]);
//   const { id } = useParams();
//   const [propertyTenants, setPropertyTenants] = useState([]);

//   useEffect(() => {
//     // get data from the api using the user data passed as props
//     const fetchSinglePropertyById = async () => {
//       try {
//         let resp = await axios.get(
//           `http://localhost:8080/api/properties/${id}`
//         );
//         setPropertyData(resp.data);
//         console.log(propertyData);
//       } catch (error) {
//         console.error("Error fetching properties:", error);
//       }
//     };
//     fetchSinglePropertyById();
//   }, [id]);

//   useEffect(() => {
//     // get data from the api using the user data passed as props
//     const fetchAllPropertyTenants = async () => {
//       try {
//         let resp = await axios.get(`http://localhost:8080/api/tenants`);
//         setTenantsData(resp.data);
//         console.log(tenantsData);
//       } catch (error) {
//         console.error("Error fetching properties:", error);
//       }
//     };
//     fetchAllPropertyTenants();
//   }, []);

//   //map all tenants data if its tenantsData.property_id matches the propertyData.id
//   //then those that matches the propertyData id is put in an array of objects
//   useEffect(() => {
//     const filteredTenants = tenantsData.filter(
//       (tenant) => tenant.property_id === propertyData.id
//     );
//     setPropertyTenants(filteredTenants);
//     console.log(propertyData);
//   }, [tenantsData, propertyData]);
//   console.log(propertyTenants);
//   return (
//     <main>
//       <Header user={propertyData.landlord_id} handleLogout={handleLogout} />

//       {/* <Header user={propertyData.landlord_id} handleLogout={() => {}} /> */}
//       <div>
//         <h1> This is Single property Details</h1>
//         <p> {propertyData.id}</p>
//         <p> {propertyData.landlord_id}</p>
//         <p> {propertyData.property_name}</p>
//       </div>

//       <div className="tenants-list">
//         <PropertyTenantsList
//           propertyTenants={propertyTenants}
//           setPropertyTenants={setPropertyTenants}
//         />
//       </div>
//     </main>
//   );
// }

// export default SinglePropertyDetails;
