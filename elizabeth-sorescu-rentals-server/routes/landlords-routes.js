const router = require("express").Router();
const landlordController = require("../controllers/landlord-controller");
const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//AUTHORIZATION
// ## POST /api/users/register
// - Creates a new user.
// - Expected body: { landlord_name, phone, email, password, role }
// router.post("/register", async (req, res) => {
//   const { name, phone, email, password, role } = req.body;

//   if (!name || !phone || !email || !password || !role) {
//     console.log(res.data);
//     return res.status(400).send("Please enter the required fields.");
//   }

//   const hashedPassword = bcrypt.hashSync(password);

//   // Create the new user
//   const newLandlord = {
//     name,
//     phone,
//     email,
//     password: hashedPassword,
//     role,
//   };

//   const newTenant = {
//     name,
//     phone,
//     email,
//     password: hashedPassword,
//     role,
//   };
//   // Insert it into our database
//   try {
//     if (role === "landlord") {
//       await knex("landlords").insert(newLandlord);
//     } else {
//       await knex("tenants").insert(newTenant);
//     }
//     res.status(201).send("Registered successfully");
//   } catch (error) {
//     console.log(error);
//     res.status(400).send("Failed registration");
//   }
// });

// // ## POST /api/users/login
// // -   Generates and responds a JWT for the user to use for future authorization.
// // -   Expected body: { email, password }
// // -   Response format: { token: "JWT_TOKEN_HERE" }
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).send("Please enter the required fields");
//   }

//   // Find the user
//   const user = await knex("landlords").where({ email: email }).first();
//   if (!user) {
//     return res.status(400).send("Invalid email");
//   }

//   // Validate the password
//   const isPasswordCorrect = bcrypt.compareSync(password, user.password);
//   if (!isPasswordCorrect) {
//     return res.status(400).send("Invalid password");
//   }

//   // Generate a token
//   const token = jwt.sign(
//     { id: user.id, email: user.email },
//     process.env.JWT_KEY,
//     {
//       expiresIn: "24h",
//     }
//   );

//   res.json({ token });
// });

// // ## GET /api/users/current
// // -   Gets information about the currently logged in user.
// // -   If no valid JWT is provided, this route will respond with 401 Unauthorized.
// // -   Expected headers: { Authorization: "Bearer JWT_TOKEN_HERE" }
// router.get("/current", async (req, res) => {
//   // If there is no auth header provided
//   if (!req.headers.authorization) {
//     return res.status(401).send("Please login");
//   }

//   // Parse the bearer token
//   const authHeader = req.headers.authorization;
//   const authToken = authHeader.split(" ")[1];

//   // Verify the token
//   try {
//     const decoded = jwt.verify(authToken, process.env.JWT_KEY);

//     // Respond with the appropriate user data
//     const user = await knex("landlords").where({ id: decoded.id }).first();
//     delete user.password;
//     res.json(user);
//   } catch (error) {
//     return res.status(401).send("Invalid auth token");
//   }
// });
//////////////////////////////////////////////
//routes handlers of other components and pages
router
  .route("/")
  .get(landlordController.getAllLandlords)
  .post(landlordController.postNewLandlord);

router
  .route("/:id")
  .get(landlordController.getLandlordById)
  .delete(landlordController.deleteLandlordById)
  .patch(landlordController.updateLandlordData);

// Lists all properties in a specific landlord id
router
  .route("/:id/properties")
  .get(landlordController.getPropertiesOfALandlordById);

module.exports = router;
