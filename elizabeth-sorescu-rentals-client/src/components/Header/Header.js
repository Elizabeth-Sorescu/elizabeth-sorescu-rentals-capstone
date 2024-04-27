import React, { useState } from "react";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import logo from "../../assets/logos/main-rentals-logo.svg";
import profileIcon from "../../assets/icons/profile-gray.svg";
import homeIcon from "../../assets/icons/home-gray.svg";
import { NavLink, Link } from "react-router-dom";

function Header({ user, handleLogout }) {
  const [showProfileInfo, setShowProfileInfo] = useState(false);

  const handleProfileIconClick = () => {
    setShowProfileInfo(!showProfileInfo);
  };

  return (
    <nav className="header-nav">
      <label>
        <NavLink to="/">
          <div className="header-nav__logo">
            <img src={logo} alt="rentals logo" />
          </div>
        </NavLink>
      </label>
      <div className="header-nav__menu">
        <div className="header-nav__menu--pic" onClick={handleProfileIconClick}>
          <img src={profileIcon} alt="user profile icon"></img>
        </div>
        <div className="header-nav__menu--pic">
          <Link to="/current/user">
            <img src={homeIcon} alt="home icon"></img>
          </Link>
        </div>
      </div>
      {/* Check if user is defined before rendering ProfileInfo */}
      {user && showProfileInfo && (
        <ProfileInfo user={user} handleLogout={handleLogout} />
      )}
    </nav>
  );
}

export default Header;
