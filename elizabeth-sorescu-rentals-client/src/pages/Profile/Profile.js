// import "./Dashboard.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log("this is the token : " + token);
    if (!token) {
      return setFailedAuth(true);
    }

    // Get the user data from the API

    const fetchUser = async () => {
      //   let response = userInput;
      let response = null;
      try {
        response = await axios.get("http://localhost:8080/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            userInput: location.state.userInput,
          },
        });
        console.log("this is the payload : " + response);
        const userData = token.split(".")[1];
        setUser(userData);
      } catch (error) {
        console.log(error); //error from line 23-31; i cannot get the user data from response.data using Bearer Token
        // console.log(response.data);
        setFailedAuth(true);
      }
    };
    fetchUser();
  }, []);

  ///////////////////////////////////////////////////////////////////
  //     axios
  //       .get("http://localhost:8080/api/users/profile", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((response) => {
  //         setUser(response.data);
  //         console.log("this is the response.data : " + response.data);
  //       })
  //       .catch((error) => {
  //         console.log("this is the error : " + error);
  //         setFailedAuth(true);
  //       });
  //   }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setFailedAuth(true);
  };

  if (failedAuth) {
    // debugger;
    return (
      <main className="dashboard">
        <p>You must be logged in to see this page.</p>
        <p>
          <Link to="/login">Log in</Link>
        </p>
      </main>
    );
  }

  if (user === null) {
    return (
      <main className="dashboard">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="dashboard">
      <h1 className="dashboard__title">Profile</h1>

      <p>Welcome back, {user.name}</p>

      <h2>My Profile</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Address: {user.address}</p>

      <button className="dashboard__logout" onClick={handleLogout}>
        Log out
      </button>
    </main>
  );
}

export default Profile;
