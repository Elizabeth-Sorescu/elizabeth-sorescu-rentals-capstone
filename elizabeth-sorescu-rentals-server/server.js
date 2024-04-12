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
// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.use("/api/users", usersRoutes); //throw new TypeError('Router.use() requires a middleware function but got a ' + gettype(fn))
// app.use("/api/users", landlordsRoutes);
// Routes
app.use("/api/landlords", landlordsRoutes);
app.use("/api/properties", propertiesRoutes);
app.use("/api/tenants", tenantsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .send(
      "An unexpected error occurred while processing your request. Please try again later"
    );
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

///////////////////////////////////////////////////////////////////////
// // Authentication and Authorization
// const secret = "g80e4494-04b3-4d49-8c27-57faed9e5785";

// //This method will authorize user
// function authorize(req, res, next) {
//   if (!req.headers.authorization) {
//     return res.status(401).send("Auth token is required");
//   }

//   const token = req.headers.authorization.split(" ")[1];
//   console.log(token);

//   jwt.verify(token, secret, (err, decoded) => {
//     if (err) return res.status(401).send("Invalid auth token");

//     req.decoded = decoded;

//     next();
//   });
// }

// const users = {};

// app.post("/signup", (req, res) => {
//   const { name, phone, email, password, role } = req.body;
//   users[email] = {
//     name,
//     phone,
//     password: hashedPassword, // NOTE: Passwords should NEVER be stored in the clear like this. Use a
//     // library like bcrypt to Hash the password. For demo purposes only.
//     role,
//   };
//   res.json({ success: "true" });
// });
// const hashedPassword = bcrypt.hashSync(password);
// // Login end point
// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   const user = users[email];
//   if (
//     user &&
//     user.password === password &&
//     user.name &&
//     user.phone &&
//     user.role
//   ) {
//     console.log("Found user:", user);
//     const token = jwt.sign({ name: user.name }, secret);
//     return res.json({ token });
//   }

//   res.status(401).json({
//     error: {
//       message: "Error logging in. Invalid email/password combination.",
//     },
//   });
// });

// // A Profile end-point that will return user information,
// // in this example, the user's name that they provided
// // when they signed up.
// // The authorize middleware function must check for
// // a token, verify that the token is valid, decode
// // the token and put the decoded data onto req.decoded
// app.get("/profile", authorize, (req, res) => {
//   res.json(req.decoded);
//   console.log(req.decoded);
// });
