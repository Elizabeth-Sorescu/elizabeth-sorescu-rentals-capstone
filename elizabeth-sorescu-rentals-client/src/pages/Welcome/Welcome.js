import backdrop from "../../assets/images/main-welcome.svg";
import { useNavigate } from "react-router-dom";
import "./Welcome.scss";

function Welcome() {
  let navigate = useNavigate();

  const handleGetStarted = () => {
    let path = "/signup";
    navigate(path);
  };
  return (
    <section className="rentals">
      <img
        className="rentals__backdrop"
        src={backdrop}
        alt="welcome backdrop"
      ></img>
      <div className="rentals__btn">
        <button className="rentals__btn--cta" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </section>
  );
}

export default Welcome;
