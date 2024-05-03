import React, { useState } from "react";
import "../ProfileInfo/ProfileInfo.scss";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/icons/avatar.svg";
import payment from "../../assets/images/payment-details.svg";
import settings from "../../assets/images/settings.svg";
import services from "../../assets/images/contact-handyman.svg";
import closeIcon from "../../assets/icons/close.svg";

function ProfileInfo({ user, handleLogout }) {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(true);

  const handleClose = () => {
    setShowProfile(false);
    navigate("/current/user");
  };

  return showProfile ? (
    <main className="profile">
      <section className="profile__elem">
        <div className="profile__heading">
          <h1 className="profile__heading--label">Profile</h1>
          <img
            src={closeIcon}
            alt="close button"
            className="add-tenant__heading--close"
            onClick={handleClose}
          />
        </div>
        <div className="profile_elem1">
          <img src={avatar} alt="user avatar" />
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <p>{user.role}</p>
        </div>
        <div className="profile_elem2">
          <div>
            <div>
              <img
                className="profile_elem2--img"
                src={payment}
                alt="payment details"
              />
            </div>
            <div>
              <img
                className="profile_elem2--img"
                src={settings}
                alt="settings"
              />
            </div>
            <div>
              <a
                href="https://www.yelp.ca/search?cflt=handyman"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="profile_elem2--img"
                  src={services}
                  alt="handyman services"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="profile__logout">
          <button className="profile__logout--btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </section>
    </main>
  ) : (
    <div></div>
  );
}

export default ProfileInfo;
