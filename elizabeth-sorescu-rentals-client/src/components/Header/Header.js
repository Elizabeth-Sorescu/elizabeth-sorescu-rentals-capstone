import React, { useState } from "react";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import logo from "../../assets/logos/rentals-caps-logo1.svg";
import profileIcon from "../../assets/icons/icons8-user-24.png";
import homeIcon from "../../assets/icons/icons8-home-24.png";
import { NavLink, Link } from "react-router-dom";

function Header({ user, handleLogout }) {
  const [showProfileInfo, setShowProfileInfo] = useState(false);

  const handleProfileIconClick = () => {
    setShowProfileInfo(!showProfileInfo);
  };

  console.log(showProfileInfo);
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
          <Link to="/properties">
            <img src={homeIcon} alt="home icon"></img>
          </Link>
        </div>
      </div>
      {showProfileInfo && (
        <ProfileInfo
          onClose={handleProfileIconClick}
          showProfileInfo={showProfileInfo}
          setShowProfileInfo={setShowProfileInfo}
          user={user}
          handleLogout={handleLogout}
        />
      )}
    </nav>
  );
}

export default Header;

// import "../Header/Header.scss";
// import logo from "../../assets/logos/rentals-caps-logo1.svg";
// import profileIcon from "../../assets/icons/icons8-user-24.png";
// import homeIcon from "../../assets/icons/icons8-home-24.png";
// import { NavLink, Link } from "react-router-dom";

// function Header() {
//   return (
//     <nav className="header-nav">
//       <label>
//         <NavLink to="/">
//           <div className="header-nav__logo">
//             <img src={logo} alt="rentals logo" />
//           </div>
//         </NavLink>
//       </label>
//       <div className="header-nav__menu">
//         <div className="header-nav__menu--pic">
//           {/* <Link to="/current/user">
//             <img src={profileIcon} alt="user profile icon"></img>
//           </Link> */}
//           <img src={profileIcon} alt="user profile icon"></img>
//         </div>
//         <div className="header-nav__menu--pic">
//           <Link to="/properties">
//             <img src={homeIcon} alt="home icon"></img>
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }
// export default Header;
