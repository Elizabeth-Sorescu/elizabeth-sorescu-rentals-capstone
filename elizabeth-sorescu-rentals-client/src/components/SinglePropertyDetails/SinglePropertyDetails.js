import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./SinglePropertyDetails.scss";
import Header from "../Header/Header";
import backBtn from "../../assets/icons/back-button.svg";
import PropertyTenantsList from "../PropertyTenantsList/PropertyTenantsList";
import Footer from "../../components/Footer/Footer";

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
    if (propertyData.id) {
      fetchPropertyTenants();
    }
  }, [propertyData]);
  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth();
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

  const currentMonthName = monthNames[currentMonthIndex];

  const totalExpense =
    propertyData.mortgage +
    propertyData.strata_fee +
    propertyData.property_tax +
    propertyData.property_insurance +
    propertyData.maintenance_fee +
    propertyData.other_fees;

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
        <h1 className="property__info--heading">
          {propertyData.property_name}
        </h1>
        <div className="property__info--gross-income">
          <p>{currentMonthName} Rent: </p>
          <p className="property__info--gross-income__val">
            $ {propertyData.monthly_rent}
          </p>
        </div>
        <section className="property__info--expenses">
          <h2 className="property__info--expenses--heading">
            Monthly Expenditures:
          </h2>
          <div className="property__info--expenses__container">
            <label className="property__info--expenses__label">Mortgage:</label>
            <p className="property__info--expenses__value">
              ${propertyData.mortgage}
            </p>
          </div>
          <div className="property__info--expenses__container">
            <label className="property__info--expenses__label">
              Strata fee:
            </label>
            <p className="property__info--expenses__value">
              ${propertyData.strata_fee}
            </p>
          </div>
          <div className="property__info--expenses__container">
            <label className="property__info--expenses__label">
              Property Tax:
            </label>
            <p className="property__info--expenses__value">
              ${propertyData.property_tax}
            </p>
          </div>
          <div className="property__info--expenses__container">
            <label className="property__info--expenses__label">
              Property Insurance:
            </label>
            <p className="property__info--expenses__value">
              ${propertyData.property_insurance}
            </p>
          </div>
          <div className="property__info--expenses__container">
            <label className="property__info--expenses__label">
              Repairs & maintenance:
            </label>
            <p className="property__info--expenses__value">
              ${propertyData.maintenance_fee}
            </p>
          </div>
          <div className="property__info--expenses__container">
            <label className="property__info--expenses__label">
              Other fees:
            </label>
            <p className="property__info--expenses__value">
              ${propertyData.other_fees}
            </p>
          </div>
          <div className="property__info--expenses__total">
            Less Total Expenses: $ {totalExpense}
          </div>
        </section>
        <div className="property__info--net">
          <p>Net Income: </p>
          <p className={`property__info--net__${netIncomeClass}`}>
            $ {netIncome}
          </p>
        </div>
        <Link className="property__info--details">View More Info</Link>
      </div>
      <div className="property__info--tenants-list">
        <PropertyTenantsList
          propertyTenants={propertyTenants}
          setPropertyTenants={setPropertyTenants}
          propertyId={propertyData.id}
        />
      </div>
      <Footer />
    </main>
  );
}

export default SinglePropertyDetails;
