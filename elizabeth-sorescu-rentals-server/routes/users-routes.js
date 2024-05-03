const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { name, phone, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).send("Please enter the required fields.");
  }

  const hashedPassword = bcrypt.hashSync(password);

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

  try {
    if (role === "landlord") {
      await knex("landlords").insert(newLandlord);
    }
    if (role === "tenant") {
      await knex("tenants").insert(newTenant);
    }
    res.status(201).send("Registered successfully");
  } catch (error) {
    res.status(400).send("Failed registration");
  }
});

router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).send("Please enter the required fields");
  }

  let user;

  if (role === "landlord") {
    user = await knex("landlords").where({ email }).first();
  } else if (role === "tenant") {
    user = await knex("tenants").where({ email }).first();
  }

  if (!user) {
    return res.status(400).send("Invalid email");
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).send("Invalid password");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_KEY,
    {
      expiresIn: "24h",
    }
  );

  res.json({ token });
});

router.get("/current/user", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .send("Please provide a valid authentication token");
    }
    const authToken = authHeader.split(" ")[1];
    const decoded = jwt.verify(authToken, process.env.JWT_KEY);

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
    return res.status(401).send("Invalid auth token");
  }
});

module.exports = router;
