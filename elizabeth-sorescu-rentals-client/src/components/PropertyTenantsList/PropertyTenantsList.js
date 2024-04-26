import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
// import addBtn from "../../assets/icons/add.svg";
import AddTenantLandlordForm from "../AddTenantLandlordForm/AddTenantLandlordForm";

function PropertyTenantsList({ propertyTenants, setPropertyTenants }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showAddTenantForm, setShowAddTenantForm] = useState(false);

  const handleSubmit = async (newTenant) => {
    const propertyId =
      propertyTenants.length > 0 ? propertyTenants[0].property_id : "";

    const newTenantInput = { ...newTenant, property_id: propertyId };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/tenants",
        newTenantInput
      );

      setSuccess(true);
      setError("");

      // Update propertyTenants state with the newly added tenant
      const updatedPropertyTenants = [...propertyTenants, response.data];
      setPropertyTenants(updatedPropertyTenants);

      setShowAddTenantForm(false);
    } catch (error) {
      console.error("Failed to submit form:", error);
      setSuccess(false);
      setError(error.response.data);
    }
  };

  return (
    <main>
      <h1>Tenants List:</h1>
      <div className="tenant-card">
        {propertyTenants.map((tenant) => (
          <div className="tenant-card__info" key={tenant.id}>
            <p> {tenant.id}</p>
            <p> {tenant.name}</p>
            <p> {tenant.room_location}</p>
            <p>Property id: {tenant.property_id}</p>
          </div>
        ))}
      </div>

      {showAddTenantForm ? (
        <AddTenantLandlordForm onSubmit={handleSubmit} />
      ) : (
        <button onClick={() => setShowAddTenantForm(true)}>Add Tenant</button>
      )}

      {success && (
        <div className="success-message">Tenant added successfully!</div>
      )}
      {error && <div className="error-message">{error}</div>}
    </main>
  );
}

export default PropertyTenantsList;

////////////////////////////////////////////////////////////////////
// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// // import addBtn from "../../assets/icons/add.svg";

// function PropertyTenantsList({ propertyTenants }) {
//   const [newTenant, setNewTenant] = useState({
//     name: "",
//     room_location: "",
//     monthly_rent: "",
//     email: "",
//     phone: "",
//   });
//   const formRef = useRef();
//   const nameInputRef = useRef(); // Create a ref for the Type input
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   //Handle change of input values
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewTenant({ ...newTenant, [name]: value });
//   };

//   //Handle Submit of Add Tenant
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const propertyId =
//       propertyTenants.length > 0 ? propertyTenants[0].property_id : "";

//     const { name, room_location, monthly_rent, email, phone } = formRef.current;

//     let newTenantInput = {
//       name: name.value,
//       room_location: room_location.value,
//       monthly_rent: monthly_rent.value,
//       email: email.value,
//       phone: phone.value,
//       property_id: propertyId,
//     };

//     //Create new tenant
//     try {
//       // Send request to add new tenant
//       await axios.post("http://localhost:8080/api/tenants", newTenantInput);

//       setSuccess(true);
//       setError("");

//       // Clear input fields after successful submission
//       setNewTenant({
//         name: "",
//         room_location: "",
//         monthly_rent: "",
//         email: "",
//         phone: "",
//       });
//       nameInputRef.current.focus(); // Return focus to the Type input
//     } catch (error) {
//       // Handle error
//       console.error("Failed to submit form:", error);
//       setSuccess(false);
//       setError(error.response.data);
//     }
//     window.location.reload();
//   };
//   useEffect(() => {
//     let timeoutId;
//     if (success) {
//       // Automatically hide the success message after 3 seconds
//       timeoutId = setTimeout(() => {
//         setSuccess(false);
//       }, 4000);
//     }

//     return () => {
//       // Clear the timeout after the component unmounts or success state changes
//       clearTimeout(timeoutId);
//     };
//   }, [success]);

//   return (
//     <main>
//       <h1>Tenants List:</h1>
//       <div className="tenant-card">
//         {propertyTenants.map((tenant) => (
//           <div className="tenant-card__info" key={tenant.id}>
//             <p> {tenant.id}</p>
//             <p> {tenant.name}</p>
//             <p> {tenant.room_location}</p>
//             <p>Property id: {tenant.property_id}</p>
//           </div>
//         ))}
//       </div>
//       <div className="add-new-tenant-container">
//         <h2>Add New Tenant</h2>
//         <form id="new-tenant-form" onSubmit={handleSubmit} ref={formRef}>
//           <label>
//             Name:
//             <input
//               type="text"
//               name="name"
//               ref={nameInputRef} // Assign ref to the Name input
//               value={newTenant.name || ""}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//             Room Location:
//             <input
//               type="text"
//               name="room_location"
//               value={newTenant.room_location || ""}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//             Monthly Rent:
//             <input
//               type="number"
//               name="monthly_rent"
//               value={newTenant.monthly_rent || ""}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//             Email:
//             <input
//               type="email"
//               name="email"
//               value={newTenant.email || ""}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//             Phone:
//             <input
//               type="tel"
//               name="phone"
//               value={newTenant.phone || ""}
//               onChange={handleChange}
//             />
//           </label>
//           <button type="submit">Submit</button>

//           {success && (
//             <div className="success-message">Tenant added successfully!</div>
//           )}
//           {error && <div className="error-message">{error}</div>}
//         </form>
//       </div>
//     </main>
//   );
// }

// export default PropertyTenantsList;
