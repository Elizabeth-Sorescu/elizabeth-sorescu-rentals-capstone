import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Welcome from "./pages/Welcome/Welcome.js";
import Signup from "./pages/Signup/Signup.js";
import Login from "./pages/Login/Login.js";
import Landing from "./pages/Landing/Landing.js";
import AddPropertyLandlordForm from "./components/AddPropertyLandlordForm/AddPropertyLandlordForm.js";
import SinglePropertyDetails from "./components/SinglePropertyDetails/SinglePropertyDetails.js";
import AddTenantLandlordForms from "./components/AddTenantLandlordForm/AddTenantLandlordForm.js";
import React, { useState } from "react";

function App() {
  const [user] = useState([]);
  const [property] = useState([]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Routes for welcomepage */}
          <Route path="/" element={<Welcome />} />

          {/* Routes for signup */}
          <Route path="/signup" element={<Signup />} />

          {/* Routes for signup */}
          <Route path="/login" element={<Login />} />

          {/* Routes for welcomepage */}
          <Route path="/current/user" element={<Landing />} />

          {/* Route for add property page*/}
          <Route
            path="/landlords/:id"
            element={<AddPropertyLandlordForm user={user} />}
          />

          <Route
            path="/properties/:id"
            element={<SinglePropertyDetails property={property} />}
          />
          {/* Route for tenant page */}
          <Route path="/tenants/id" element={<AddTenantLandlordForms />} />
          {/* <Route
            path="/tenants/:id"
            element={<AddPropertyTenantForm user={user} />}
          /> */}
          {/* Route for a properties list page*/}
          {/* <Route path="/properties" element={<Properties />} /> */}

          {/* <Route
            path="/properties/:id/tenants"
            element={<PropertyTenants key={selectedProperty.id} />}
          /> */}

          {/* Route for tenant page */}
          {/* <Route path="/tenant/*" element={<Tenant />} /> */}

          {/* Route for other path */}
          {/* <Route path="/*" element={<OtherRoutes />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
