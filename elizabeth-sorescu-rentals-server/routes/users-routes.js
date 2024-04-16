const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//AUTHORIZATION
// ## POST /api/users/register
// - Creates a new user.
// - Expected body: { landlord_name, phone, email, password, role }
router.post("/register", async (req, res) => {
  const { name, phone, email, password, role } = req.body;

  if (!name || !phone || !email || !password || !role) {
    console.log(res.data);
    return res.status(400).send("Please enter the required fields.");
  }

  const hashedPassword = bcrypt.hashSync(password);

  // Create the new user
  const newLandlord = {
    name,
    phone,
    email,
    password: hashedPassword,
    role,
  };

  const newTenant = {
    name,
    phone,
    email,
    password: hashedPassword,
    role,
  };

  // Insert it into the Rentals database
  try {
    if (role === "landlord") {
      await knex("landlords").insert(newLandlord);
    }
    if (role === "tenant") {
      await knex("tenants").insert(newTenant);
    }
    res.status(201).send("Registered successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send("Failed registration");
  }
});

// ## POST /api/users/login
// -   Generates and responds a JWT for the user to use for future authorization.
// -   Expected body: { email, password, role }
// -   Response format: { token: "JWT_TOKEN_HERE" }
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;
  let user = req.body;
  if ((!email || !password, !role)) {
    return res.status(400).send("Please enter the required fields");
  }
  // Find the user
  if (role === "landlord") {
    user = await knex("landlords").where({ email: email }).first();
  } else {
    user = await knex("tenants").where({ email: email }).first();
  }
  if (!user) {
    return res.status(400).send("Invalid email");
  }
  console.log(user);
  // Validate the password
  const isPasswordCorrect = bcrypt.compareSync(password, user.password); //returns false
  if (isPasswordCorrect) {
    console.log(isPasswordCorrect);
    console.log(password);
    console.log(user.password);
    return res.status(400).send("Invalid password");
  }
  // Generate a token
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_KEY,
    {
      expiresIn: "24h",
    }
  );
  console.log(user);
  res.json({ token });
});

// ## GET /api/users/current
// -   Gets information about the currently logged in user.
// -   If no valid JWT is provided, this route will respond with 401 Unauthorized.
// -   Expected headers: { Authorization: "Bearer JWT_TOKEN_HERE" }
// -   Expected body: { email, password, role }
router.get("/profile", async (req, res) => {
  try {
    // Parse the bearer token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .send("Please provide a valid authentication token");
    }
    const authToken = authHeader.split(" ")[1];
    const decoded = jwt.verify(authToken, process.env.JWT_KEY);

    // Fetch user data based on the decoded email
    let user;
    if (decoded.role === "landlord") {
      user = await knex("landlords").where({ email: decoded.email }).first();
    } else if (decoded.role === "tenant") {
      user = await knex("tenants").where({ email: decoded.email }).first();
    } else {
      return res.status(401).send("Invalid user role");
    }

    if (!user) {
      return res.status(404).send("User not found");
    }

    delete user.password;
    res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(401).send("Invalid auth token");
  }
});

module.exports = router;
// try {
//   let user = req.body;
//   if (!user.email || !user.password || !user.role) {
//     return res.status(400).send("Please enter the required fields");
//   }
//   // Parse the bearer token
//   const authHeader = req.headers.authorization;
//   const authToken = authHeader.split(" ")[1];
//   const decoded = jwt.verify(authToken, process.env.JWT_KEY);
//   // If there is no auth header provided
//   if (!req.headers.authorization) {
//     return res.status(401).send("Please login");
//   }
//   // Verify the token
//   // Respond with the appropriate user data
//   if (user.role === "landlord") {
//     user = await knex("landlords").where({ email: decoded.email }).first();
//     delete user.password;
//     console.log(user);
//     res.json(user);
//   }
//   if (user.role === "tenant") {
//     user = await knex("tenants").where({ email: decoded.email }).first();
//     delete user.password;
//     console.log(user);
//     res.json(user);
//   }
// } catch (error) {
//   console.log(error);
//   return res.status(401).send("Invalid auth token");
// }
// });
