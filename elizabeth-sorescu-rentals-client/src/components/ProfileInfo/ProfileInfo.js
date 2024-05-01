import React from "react";
import "../ProfileInfo/ProfileInfo.scss";
import { Link } from "react-router-dom";
import avatar from "../../assets/icons/avatar.svg";
import payment from "../../assets/images/payment-details.svg";
import settings from "../../assets/images/settings.svg";
import services from "../../assets/images/contact-handyman.svg";
import backBtn from "../../assets/icons/back-button.svg";

function ProfileInfo({ user, handleLogout }) {
  return (
    <main className="profile-info">
      <section className="profile-info__elem">
        <div className="profile__heading">
          <Link to="/current/user">
            <img
              className="profile__heading--back-btn"
              src={backBtn}
              alt="back button"
            ></img>
          </Link>
          <h1 className="profile__heading--label">Profile</h1>
        </div>
        <img src={avatar} alt="user avatar"></img>
        <h1>Welcome, {user.name}!</h1>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Role: {user.role}</p>
        <img src={payment} alt="payment details" />
        <img src={settings} alt="settings" />
        <img src={services} alt="handyman services" />

        <button className="profile-info__logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </section>
    </main>
  );
}

export default ProfileInfo;
