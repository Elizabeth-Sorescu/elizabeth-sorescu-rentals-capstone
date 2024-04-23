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
    <main className="profile">
      <Header />
      <section>
        <h1>Hi, {user.name}!</h1>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>id: {user.id}</p>
        <p>role: {user.role}</p>
        <button className="profile__logout" onClick={handleLogout}>
          Log out
        </button>
      </section>
      <Properties user={user} />
      <img
        className="add-btn"
        src={addIcon}
        alt="add button"
        onClick={() => handleAddProperty({ user })}
      />

      <Footer />
    </main>
  );
}

export default Landing;