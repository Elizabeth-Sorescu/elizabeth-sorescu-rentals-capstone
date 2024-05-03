const knex = require("knex")(require("../knexfile"));

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
        rent_payment_date,
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
        rent_payment_date,
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

const postNewTenant = async (req, res) => {
  try {
    const {
      property_id,
      name,
      room_location,
      monthly_rent,
      rent_payment_date,
      messages,
      rating,
      num_reviews,
      email,
      phone,
      password,
      role,
    } = req.body;

    const [newItemId] = await knex("tenants").insert({
      property_id,
      name,
      room_location,
      monthly_rent,
      rent_payment_date,
      messages,
      rating,
      num_reviews,
      email,
      phone,
      password,
      role,
    });

    const insertedItem = await knex("tenants")
      .where({ id: newItemId })
      .select(
        "id",
        "property_id",
        "name",
        "room_location",
        "monthly_rent",
        "rent_payment_date",
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

const getPropertiesOfATenantById = async (req, res) => {
  try {
    const properties = await knex("tenants")
      .join("properties", "properties.id", "tenants.property_id")
      .where({ "tenants.id": req.params.id });
    const tenantPropertyData = properties.map((item) => {
      const {
        id,
        property_name,
        street_address,
        city,
        country,
        description,
        type,
        monthly_rent,
        rent_payment_date,
        rating,
        num_reviews,
        mortgage,
        strata_fee,
        property_tax,
        maintenance_fee,
      } = item;

      return {
        id,
        property_name,
        street_address,
        city,
        country,
        description,
        type,
        monthly_rent,
        rent_payment_date,
        rating,
        num_reviews,
        mortgage,
        strata_fee,
        property_tax,
        maintenance_fee,
      };
    });
    if (properties.length === 0) {
      return res.status(404).json({
        message: `Tenant with ID ${req.params.id} is not found`,
      });
    } else {
      res.status(200).json(tenantPropertyData);
    }
  } catch (error) {
    res.status(404).json({
      message: `Unable to retrieve properties of a tenant with ID ${req.params.id}: ${error}`,
    });
  }
};

module.exports = {
  getAllTenants,
  getTenantById,
  postNewTenant,
  deleteTenantById,
  updateTenantData,
  getPropertiesOfATenantById,
};
