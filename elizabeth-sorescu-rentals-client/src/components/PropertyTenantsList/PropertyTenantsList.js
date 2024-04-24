import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import addBtn from "../../assets/icons/add.svg";
import Header from "../Header/Header";

function PropertyTenantsList({ propertyTenants }) {
  const navigate = useNavigate();
  const handleAddProperty = () => {
    navigate(`/tenants`);
  };
  return (
    <main>
      <h1>Tenants List:</h1>
      <div className="tenant-card">
        {propertyTenants.map((tenant) => {
          return (
            <div>
              <p> {tenant.id}</p>
              <p> {tenant.name}</p>
              <p> {tenant.room_location}</p>
            </div>
          );
        })}

        <img
          className="add-btn"
          src={addBtn}
          alt="add button"
          onClick={() => handleAddProperty({ propertyTenants })}
        />
      </div>
    </main>
  );
}

export default PropertyTenantsList;
