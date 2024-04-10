import logo from "../../assets/logos/rentals-logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import "../Welcome/Welcome.scss";

function Welcome() {
  let navigate = useNavigate();

  const handleGetStarted = () => {
    let path = "/signup";
    navigate(path);
  };
  return (
    <section className="">
      <NavLink to="/">
        <div className="rentals-logo">
          <img className="logo" src={logo} alt="rentals Logo" />
        </div>
      </NavLink>
      <p className="slogan">
        Empower Your Rental Journey: Connect, Document, Resolve.
      </p>

      <p className="description">
        Rentals is an innovative application designed to streamline the
        relationship between landlords and tenants, eliminating the need for a
        third-party intermediary like a property management company.
      </p>
      <button className="Start-btn" onClick={handleGetStarted}>
        Get Started
      </button>
    </section>
  );
}

export default Welcome;
