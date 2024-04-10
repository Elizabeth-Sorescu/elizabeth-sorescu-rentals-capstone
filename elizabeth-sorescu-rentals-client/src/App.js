import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Welcome from "./components/Welcome/Welcome.js";
import Signup from "./components/Signup/Signup.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Routes for welcomepage */}
          <Route path="/" element={<Welcome />} />

          {/* Routes for signup */}
          <Route path="/signup" element={<Signup />} />
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
