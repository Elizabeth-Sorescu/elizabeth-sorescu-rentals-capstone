import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Welcome from "./pages/Welcome/Welcome.js";
import Signup from "./pages/Signup/Signup.js";
import Login from "./pages/Login/Login.js";
import Profile from "./pages/Profile/Profile.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Routes for welcomepage */}
          <Route path="/" element={<Welcome />} />

          {/* Routes for signup */}
          <Route path="/signup" element={<Signup />} />

          {/* Routes for signup */}
          <Route path="/login" element={<Login />} />

          {/* Routes for welcomepage */}
          <Route path="/current/user" element={<Profile />} />

          {/* Route for a properties list page*/}
          {/* <Route path="/properties" element={<Properties />} /> */}

          {/* <Route
            path="/properties/:id/tenants"
            element={<PropertyDetails key={selectedProperty.id} />}
          /> */}
          {/* Route for add property page*/}
          {/* <Route path="/properties/add" element={<AddProperty />} /> */}

          {/* Route for tenant page */}
          {/* <Route path="/tenant/*" element={<Tenant />} /> */}

          {/* Route for other path */}
          {/* <Route path="/*" element={<OtherRoutes />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
