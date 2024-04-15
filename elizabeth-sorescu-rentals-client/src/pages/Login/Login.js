import "./Login.scss";
// import Input from "../../components/Input/Input";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const formRef = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, role } = formRef.current;

    let userInput = {
      email: email.value,
      password: password.value,
      role: role.value,
    };

    const createNewLogin = async () => {
      let response = null;

      try {
        response = await axios.post(
          "http://localhost:8080/api/users/login",
          userInput
        );
        sessionStorage.setItem("token", response.data.token);
        setSuccess(true);
        setError("");
        navigate("/profile");
        console.log(response.data); //
        // console.log(response.data.email); //
      } catch (error) {
        console.error(error);
        setError(error.response.data);
      }
    };
    createNewLogin();
  };

  /////////////////////////

  //   const handleSubmit = (event) => {
  //     event.preventDefault();

  //     axios
  //       .post("http://localhost:8080/api/users/login", {
  //         email: event.target.email.value,
  //         password: event.target.password.value,
  //         role: event.target.role.value,
  //       })
  //       .then((response) => {
  //         sessionStorage.setItem("token", response.data.token);
  //         setSuccess(true);
  //         setError("");
  //         navigate("/profile");
  //         console.log(response.data.name); //undefined
  //         console.log(response.data.email); //undefined
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         setError(error.response.data);
  //       });
  //   };

  return (
    <main className="login-page">
      <form className="login" onSubmit={handleSubmit} ref={formRef}>
        {/* <h1 className="login__title">Log in</h1> */}

        <label>EMAIL</label>
        <input type="text" name="email" id="email" />

        <label>PASSWORD</label>
        <input type="text" name="password" id="password" />

        <p>Click one that applies to your role</p>
        <div id="roles">
          <input type="radio" id="landlord" name="role" value="landlord" />
          <label for="landlord">Landlord</label>

          <input type="radio" id="tenant" name="role" value="tenant" />
          <label for="tenant">Tenant</label>
        </div>

        <button className="login-btn">Login</button>
        {success && <div className="login__message">Go to profile!</div>}
        {error && <div className="login__message">{error}</div>}
      </form>
      <p>
        <Link to="/signup">SIGN UP FOR FREE</Link>
      </p>
    </main>
  );
}

export default Login;
