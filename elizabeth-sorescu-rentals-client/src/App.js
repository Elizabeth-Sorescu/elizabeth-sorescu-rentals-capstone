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
          <Route path="/" element={<Welcome />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/login" element={<Login />} />

          <Route path="/current/user" element={<Landing />} />

          <Route
            path="/landlords/:id"
            element={<AddPropertyLandlordForm user={user} />}
          />

          <Route
            path="/properties/:id"
            element={<SinglePropertyDetails property={property} />}
          />

          <Route path="/tenants/:id" element={<AddTenantLandlordForms />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
