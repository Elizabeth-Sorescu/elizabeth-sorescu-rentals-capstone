const knex = require("knex")(require("../knexfile"));

//GET ALL tenants data
const getAllTenants = async (_req, res) => {
  try {
    const data = await knex("tenants");
    const tenantData = data.map((tenantInfo) => {
      const {
        id,
        property_id,
        name,
        room_location,
        monthly_rent,
        messages,
        rating,
        num_reviews,
        email,
        phone,
        password,
        role,
      } = tenantInfo;

      return {
        id,
        property_id,
        name,
        room_location,
        monthly_rent,
        messages,
        rating,
        num_reviews,
        email,
        phone,
        password,
        role,
      };
    });

    res.status(200).json(tenantData);
  } catch (error) {
    res.status(400).send(`Error retrieving properties: ${error}`);
  }
};

//GET one tenant with its respective id
const getTenantById = async (req, res) => {
  try {
    const tenantFound = await knex("tenants").where({
      id: req.params.id,
    });
    if (tenantFound.length === 0) {
      return res.status(404).json({
        message: `Tenant with ID ${req.params.id} is not found`,
      });
    }
    const tenantData = tenantFound[0];
    res.status(200).json(tenantData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve tenant data with ID ${req.params.id}`,
    });
  }
};

//POST a new tenant
const postNewTenant = async (req, res) => {
  try {
    const {
      property_id,
      name,
      room_location,
      monthly_rent,
      messages,
      rating,
      num_reviews,
      email,
      phone,
      password,
      role,
    } = req.body;

    // Insert new tenant into the database
    const [newItemId] = await knex("tenants").insert({
      property_id,
      name,
      room_location,
      monthly_rent,
      messages,
      rating,
      num_reviews,
      email,
      phone,
      password,
      role,
    });

    // Retrieve and respond with the inserted item
    const insertedItem = await knex("tenants")
      .where({ id: newItemId })
      .select(
        "id",
        "property_id",
        "name",
        "room_location",
        "monthly_rent",
        "messages",
        "rating",
        "num_reviews",
        "email",
        "phone",
        "password",
        "role"
      )
      .first();

    res.status(201).json(insertedItem);
  } catch (err) {
    res.status(500).json({
      message: `Unable to create new tenant item: ${err.message}`,
    });
  }
};

// This method will delete a single tenant with specific id
const deleteTenantById = async (req, res) => {
  try {
    const tenantRowDeleted = await knex("tenants").where({
      id: req.params.id,
    });

    if (tenantRowDeleted.length === 0) {
      return res.status(404).json({
        message: `Tenant with ID ${req.params.id} is not found`,
      });
    }

    await knex("tenants").where({ id: req.params.id }).delete();

    res.status(204).end();
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete tenant: ${error}`,
    });
  }
};

// UPDATE SOME fields value of a property
const updateTenantData = async (req, res) => {
  try {
    const rowsUpdated = await knex("tenants")
      .where({ id: req.params.id })
      .update(req.body);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Tenant with ID ${req.params.id} is not found`,
      });
    }

    const updatedTenant = await knex("tenants").where({
      id: req.params.id,
    });

    res.json(updatedTenant[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update tenant with ID ${req.params.id}: ${error}`,
    });
  }
};

module.exports = {
  getAllTenants,
  getTenantById,
  postNewTenant,
  deleteTenantById,
  updateTenantData,
};
