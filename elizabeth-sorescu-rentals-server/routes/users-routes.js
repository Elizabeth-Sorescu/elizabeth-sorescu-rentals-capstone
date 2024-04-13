const router = require("express").Router();
// const landlordController = require("../controllers/landlord-controller");
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
  // Insert it into our database
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
// -   Expected body: { email, password }
// -   Response format: { token: "JWT_TOKEN_HERE" }
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).send("Please enter the required fields");
  }

  // Find the user
  let user = { email, password, role };
  if (role === "landlord") {
    user = await knex("landlords").where({ email: email }).first();
  }
  if (role === "tenant") {
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
    { id: user.id, email: user.email },
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
router.get("/profile", async (req, res) => {
  // If there is no auth header provided
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }

  // Parse the bearer token
  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(" ")[1];

  // Verify the token
  try {
    const decoded = jwt.verify(authToken, process.env.JWT_KEY);

    // Respond with the appropriate user data
    let user = null;
    userLandlord = await knex("landlords").where({ id: decoded.id }).first();
    userTenant = await knex("tenants").where({ id: decoded.id }).first();
    if (userLandlord.role === "landlord") {
      delete user.password;
      console.log(user);
      res.json(user);
      return (user = userLandlord);
    } else {
      delete user.password;
      console.log(user);
      res.json(user);
      return (user = userTenant);
    }
  } catch (error) {
    // console.log(user);
    console.log(error);
    return res.status(401).send("Invalid auth token");

    ////////////////////////////////
    //     let user = null;

    //     if (role === "landlord") {
    //       user = await knex("landlords").where({ id: decoded.id }).first();
    //     } else {
    //       user = await knex("tenants").where({ id: decoded.id }).first();
    //       role = "tenant";
    //     }
    //     delete user.password;
    //     console.log(user);
    //     res.json(user);
    //   } catch (error) {
    //     console.log(error);
    //     return res.status(401).send("Invalid auth token");
  }
});

module.exports = router;
