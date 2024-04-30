import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./SinglePropertyDetails.scss";
import Header from "../Header/Header";
import backBtn from "../../assets/icons/back-button.svg";
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

  // Create a new Date object
  const currentDate = new Date();

  // Define an array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the current month (months are zero-indexed)
  const currentMonthIndex = currentDate.getMonth();

  // Get the month name based on the current month index
  const currentMonthName = monthNames[currentMonthIndex];

  // Calculate the total monthly expense
  const totalExpense =
    propertyData.mortgage +
    propertyData.strata_fee +
    propertyData.property_tax +
    propertyData.property_insurance +
    propertyData.maintenance_fee +
    propertyData.other_fees;

  // Calculate the net income
  const netIncome = propertyData.monthly_rent - totalExpense;
  const netIncomeClass = netIncome >= 0 ? "positive" : "negative";

  return (
    <main className="property">
      <Header user={propertyData.landlord_id} handleLogout={handleLogout} />
      <div className="property__heading">
        <Link to="/current/user">
          <img
            className="property__heading--back-btn"
            src={backBtn}
            alt="back button"
          ></img>
        </Link>
        <h1 className="property__heading--label">View Property</h1>
      </div>
      <div className="property__info">
        <div className="property__info--gross-income">
          <p>{currentMonthName} Rent: </p>
          <p className="property__info--gross-income__val">
            $ {propertyData.monthly_rent}
          </p>
        </div>
        <div className="property__info--expenses">
          <p>Monthly Expenditures:</p>
          <p>Mortgage: ${propertyData.mortgage}</p>
          <p>Strata fee: ${propertyData.strata_fee}</p>
          <p>Property Tax: ${propertyData.property_tax}</p>
          <p>Property Insurance: ${propertyData.property_insurance}</p>
          <p>Repairs & maintenance: ${propertyData.maintenance_fee}</p>
          <p>Other fees: ${propertyData.other_fees}</p>
          <div className="property__info--expenses__total">
            Less Total Expense: $ {totalExpense}
          </div>
        </div>
        <div className="property__info--net">
          <p>Net Income: </p>
          <p className={`property__info--net__${netIncomeClass}`}>
            $ {netIncome}
          </p>
        </div>
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
