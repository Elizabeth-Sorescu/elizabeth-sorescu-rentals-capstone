import "../Header/Header.scss";
import logo from "../../assets/logos/rentals-logo-final.svg";
import profileIcon from "../../assets/icons/icons8-user-24.png";
import homeIcon from "../../assets/icons/icons8-home-24.png";
import { NavLink, Link } from "react-router-dom";

function Header() {
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
        <div className="header-nav__menu--pic">
          <Link to="/current/user">
            <img src={profileIcon} alt="user profile icon"></img>
          </Link>
        </div>
        <div className="header-nav__menu--pic">
          <Link to="/properties">
            <img src={homeIcon} alt="home icon"></img>
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default Header;
