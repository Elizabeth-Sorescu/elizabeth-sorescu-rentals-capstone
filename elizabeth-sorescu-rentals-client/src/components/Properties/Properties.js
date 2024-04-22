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
        console.log(resp.data);
        console.log(userData);
        console.log(userPropertyData);
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

// import PropertyCard from "../PropertyCard/PropertyCard";
// import { useParams } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function Properties() {
//   const [userPropertyData, setUserPropertyData] = useState([]);
//   const { id } = useParams();
//   // This useEffect fetches property(ies) data of a user with user's specific Id
//   useEffect(() => {
//     const fetchPropertiesByUserId = async () => {
//       try {
//         const respLandlord = await axios.get(
//           `http://localhost:8080/api/landlords/${id}/properties`
//         );
//         setUserPropertyData(respLandlord.data);
//         const respTenant = await axios.get(
//           `http://localhost:8080/api/tenants/${id}/properties`
//         );
//         setUserPropertyData(respTenant.data);
//         console.log(respLandlord.data);
//         console.log(respTenant.data);
//       } catch (error) {
//         console.error("Error fetching properties of a user:", error);
//       }
//     };
//     fetchPropertiesByUserId();
//   }, [id]);

//   return (
//     <main>
//       Properties List:
//       {userPropertyData.map((item) => {
//         return <PropertyCard key={item.id} item={item} />;
//       })}
//     </main>
//   );
// }

// export default Properties;
