const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const landlordsRoutes = require("./routes/landlords-routes");
const propertiesRoutes = require("./routes/properties-routes");
const tenantsRoutes = require("./routes/tenants-routes");
const usersRoutes = require("./routes/users-routes");

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRoutes);

app.use("/api/landlords", landlordsRoutes);
app.use("/api/properties", propertiesRoutes);
app.use("/api/tenants", tenantsRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .send(
      "An unexpected error occurred while processing your request. Please try again later"
    );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
