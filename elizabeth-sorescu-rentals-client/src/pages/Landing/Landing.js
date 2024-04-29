import axios from "axios";
import "../Landing/Landing.scss";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Properties from "../../components/Properties/Properties";
import Footer from "../../components/Footer/Footer";
import addIcon from "../../assets/icons/add.svg";

function Landing() {
  let [user, setUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log("this is the token : " + token);

    if (!token) {
      return setFailedAuth(true);
    }

    // Get the user data from the API
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/users/current/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.log(error);
        setFailedAuth(true);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setFailedAuth(true);
    navigate(`/`);
  };

  if (failedAuth) {
    return (
      <main className="profile">
        <p>You must be logged in to see this page.</p>
        <p>
          <Link to="/login">Log in</Link>
        </p>
      </main>
    );
  }

  if (user === null) {
    return (
      <main className="profile">
        <p>Loading...</p>
      </main>
    );
  }

  const handleAddProperty = ({ user }) => {
    if (user.role === "landlord") {
      navigate(`/landlords/${user.id}`);
    }
    // This is for sprint 2 development
    if (user.role === "tenant") {
      navigate(`/tenants/${user.id}`);
    }
  };

  return (
    <main className="landing">
      <Header user={user} handleLogout={handleLogout} />
      <Properties user={user} />
      <div className="landing__add">
        <img
          className="landing__add--btn"
          src={addIcon}
          alt="add button"
          onClick={() => handleAddProperty({ user, handleLogout })}
        />
      </div>
      <Footer />
    </main>
  );
}

export default Landing;
