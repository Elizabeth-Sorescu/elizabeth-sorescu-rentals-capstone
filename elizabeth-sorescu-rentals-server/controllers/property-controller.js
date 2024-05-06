const knex = require("knex")(require("../knexfile"));
const { v4: uuidv4 } = require("uuid");

const getAllProperties = async (_req, res) => {
  try {
    const data = await knex("properties");
    const propertyData = data.map((propertyInfo) => {
      const {
        landlord_id,
        property_name,
        street_address,
        city,
        country,
        description,
        type,
        monthly_rent,
        rating,
        num_reviews,
        mortgage,
        strata_fee,
        property_tax,
        property_insurance,
        maintenance_fee,
        other_fees,
      } = propertyInfo;

      const id = uuidv4();

      return {
        id,
        landlord_id,
        property_name,
        street_address,
        city,
        country,
        description,
        type,
        monthly_rent,
        rating,
        num_reviews,
        mortgage,
        strata_fee,
        property_tax,
        property_insurance,
        maintenance_fee,
        other_fees,
      };
    });

    res.status(200).json(propertyData);
  } catch (error) {
    res.status(400).send(`Error retrieving properties: ${error}`);
  }
};

const getPropertyById = async (req, res) => {
  try {
    const propertyFound = await knex("properties").where({
      id: req.params.id,
    });
    if (propertyFound.length === 0) {
      return res.status(404).json({
        message: `Property with ID ${req.params.id} is not found`,
      });
    }
    const propertyData = propertyFound[0];
    res.status(200).json(propertyData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve property data with ID ${req.params.id}`,
    });
  }
};

const postNewProperty = async (req, res) => {
  try {
    const {
      landlord_id,
      property_name,
      street_address,
      city,
      country,
      description,
      type,
      monthly_rent,
      rating,
      num_reviews,
      mortgage,
      strata_fee,
      property_tax,
      property_insurance,
      maintenance_fee,
      other_fees,
    } = req.body;

    const [newItemId] = await knex("properties").insert({
      landlord_id,
      property_name,
      street_address,
      city,
      country,
      description,
      type,
      monthly_rent,
      rating,
      num_reviews,
      mortgage,
      strata_fee,
      property_tax,
      property_insurance,
      maintenance_fee,
      other_fees,
    });

    const insertedItem = await knex("properties")
      .where({ id: newItemId })
      .select(
        "id",
        "landlord_id",
        "property_name",
        "street_address",
        "city",
        "country",
        "description",
        "type",
        "monthly_rent",
        "rating",
        "num_reviews",
        "mortgage",
        "strata_fee",
        "property_tax",
        " property_insurance",
        "maintenance_fee",
        "other_fees"
      )
      .first();

    res.status(201).json(insertedItem);
  } catch (err) {
    res.status(500).json({
      message: `Unable to create new property item: ${err.message}`,
    });
  }
};

const deletePropertyById = async (req, res) => {
  try {
    const propertyRowDeleted = await knex("properties").where({
      id: req.params.id,
    });

    if (propertyRowDeleted.length === 0) {
      return res.status(404).json({
        message: `Property with ID ${req.params.id} is not found`,
      });
    }

    await knex("properties").where({ id: req.params.id }).delete();

    res.status(204).end();
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete property: ${error}`,
    });
  }
};

const updatePropertyData = async (req, res) => {
  try {
    const rowsUpdated = await knex("properties")
      .where({ id: req.params.id })
      .update(req.body);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Property with ID ${req.params.id} is not found`,
      });
    }

    const updatedProperty = await knex("properties").where({
      id: req.params.id,
    });

    res.json(updatedProperty[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update property with ID ${req.params.id}: ${error}`,
    });
  }
};

const getTenantsOfAPropertydById = async (req, res) => {
  try {
    const tenants = await knex("properties")
      .join("tenants", "tenants.property_id", "properties.id")
      .where({ property_id: req.params.id });

    const propertyTenantData = tenants.map((item) => {
      const {
        id,
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
      } = item;

      return {
        id,
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
    if (tenants.length === 0) {
      return res.status(404).json({
        message: `Property with ID ${req.params.id} is not found`,
      });
    } else {
      res.status(200).json(propertyTenantData);
    }
  } catch (error) {
    res.status(404).json({
      message: `Unable to retrieve tenants of a property with ID ${req.params.id}: ${error}`,
    });
  }
};
module.exports = {
  getAllProperties,
  getPropertyById,
  postNewProperty,
  deletePropertyById,
  updatePropertyData,
  getTenantsOfAPropertydById,
};
