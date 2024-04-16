import "../Header/Header.scss";
import logo from "../../assets/logos/rentals-logo.png";
import profileIcon from "../../assets/icons/icons8-user-24.png";
import homeIcon from "../../assets/icons/icons8-home-24.png";
import { NavLink, Link } from "react-router-dom";

function Header() {
  return (
    <nav className="header-nav">
      <label className="header-nav__logo">
        <NavLink to="/">
          <div className="logo">
            {/* RenTaL$ */}
            <img className="logo__pic" src={logo} alt="rentals Logo" />
          </div>
        </NavLink>
      </label>
      <div className="header-nav__menu">
        <Link to="/current/user">
          <img
            className="icon__item--pic"
            src={profileIcon}
            alt="user profile icon"
          ></img>
        </Link>
        <Link to="/properties">
          <img
            className="icon__item--pic"
            src={homeIcon}
            alt="user profile icon"
          ></img>
        </Link>
      </div>

      {/* <div>
        <Link to="/current/user">
          <img
            className="icon__item--pic"
            src={profileIcon}
            alt="user profile icon"
          ></img>
        </Link>

        <Link to="/properties">
          <img
            className="icon__item--pic"
            src={homeIcon}
            alt="user profile icon"
          ></img>
        </Link>
      </div> */}
      {/* 
      <div className="icon">
        <div className="icon__item">
          <img
            className="icon__item--pic"
            src={profileIcon}
            alt="user profile icon"
          ></img>
          <p className="icon__item--label">Profile</p>
        </div>

        <div className="icon__item">
          <img
            className="icon__item--pic"
            src={homeIcon}
            alt="user profile icon"
          ></img>
          <p className="icon__item--label">Home</p>
        </div>
      </div> */}
    </nav>
  );
}
export default Header;
