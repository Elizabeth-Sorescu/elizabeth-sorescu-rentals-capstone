import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);

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

  return (
    <main className="profile">
      {/* <h1 className="profile__title">Profile</h1> */}

      <p>Hi, {user.name}!</p>

      {/* <h2>Welcome back!</h2> */}
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>id: {user.id}</p>
      <p>role: {user.role}</p>
      <p>Payment Details</p>
      <p>Settings</p>
      <button className="profile__logout" onClick={handleLogout}>
        Log out
      </button>
    </main>
  );
}

export default Profile;
