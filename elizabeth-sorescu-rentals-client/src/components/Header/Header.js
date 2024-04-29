import React, { useState } from "react";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import logo from "../../assets/logos/main-rentals-logo.svg";
import profileIcon from "../../assets/icons/profile-gray.svg";
import homeIcon from "../../assets/icons/home-gray.svg";
import { NavLink, Link } from "react-router-dom";
import "./Header.scss";

function Header({ user, handleLogout }) {
  const [showProfileInfo, setShowProfileInfo] = useState(false);

  const handleProfileIconClick = () => {
    setShowProfileInfo(!showProfileInfo);
  };

  return (
    <nav className="header-nav">
      {/* <div className="header-nav__elems"> */}
      <div>
        <NavLink to="/">
          <div className="header-nav__logo">
            <img src={logo} alt="rentals logo" />
          </div>
        </NavLink>
      </div>
      <div className="header-nav__menu">
        <div onClick={handleProfileIconClick}>
          <img
            className="header-nav__menu--pic"
            src={profileIcon}
            alt="user profile icon"
          ></img>
        </div>
        <div>
          <Link to="/current/user">
            <img
              className="header-nav__menu--pic"
              src={homeIcon}
              alt="home icon"
            ></img>
          </Link>
        </div>
      </div>
      {/* </div> */}
      {/* Check if user is defined before rendering ProfileInfo */}
      {user && showProfileInfo && (
        <ProfileInfo user={user} handleLogout={handleLogout} />
      )}
    </nav>
  );
}

export default Header;
