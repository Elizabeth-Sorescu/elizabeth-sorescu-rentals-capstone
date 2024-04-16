const knex = require("knex")(require("../knexfile"));

//GET ALL landlords data
const getAllLandlords = async (_req, res) => {
  try {
    const data = await knex("landlords");
    const landlordData = data.map((landlordInfo) => {
      const {
        id,
        name,
        messages,
        rating,
        num_reviews,
        email,
        phone,
        password,
        role,
      } = landlordInfo;

      return {
        id,
        name,
        messages,
        rating,
        num_reviews,
        email,
        phone,
        password,
        role,
      };
    });

    res.status(200).json(landlordData);
  } catch (error) {
    res.status(400).send(`Error retrieving landlords: ${error}`);
  }
};

//GET one landlord with its respective id
const getLandlordById = async (req, res) => {
  try {
    const landlordFound = await knex("landlords").where({
      id: req.params.id,
    });
    if (landlordFound.length === 0) {
      return res.status(404).json({
        message: `Landlord with ID ${req.params.id} is not found`,
      });
    }
    const landlordData = landlordFound[0];
    res.status(200).json(landlordData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve landlord data with ID ${req.params.id}`,
    });
  }
};

//POST a new landlord
const postNewLandlord = async (req, res) => {
  try {
    const {
      name,
      messages,
      rating,
      num_reviews,
      email,
      phone,
      password,
      role,
    } = req.body;

    // Insert new landlord into the database
    const [newItemId] = await knex("landlords").insert({
      name,
      messages,
      rating,
      num_reviews,
      email,
      phone,
      password,
      role,
    });

    // Retrieve and respond with the inserted item
    const insertedItem = await knex("landlords")
      .where({ id: newItemId })
      .select(
        "id",
        "name",
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
      message: `Unable to create new landlord item: ${err.message}`,
    });
  }
};

// This method will delete a single landlord with specific id
const deleteLandlordById = async (req, res) => {
  try {
    const landlordRowDeleted = await knex("landlords").where({
      id: req.params.id,
    });

    if (landlordRowDeleted.length === 0) {
      return res.status(404).json({
        message: `Landlord with ID ${req.params.id} is not found`,
      });
    }

    await knex("landlords").where({ id: req.params.id }).delete();

    res.status(204).end();
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete landlord: ${error}`,
    });
  }
};

// UPDATE SOME fields value of a landlord
const updateLandlordData = async (req, res) => {
  try {
    const rowsUpdated = await knex("landlords")
      .where({ id: req.params.id })
      .update(req.body);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Landlord with ID ${req.params.id} is not found`,
      });
    }

    const updatedLandlord = await knex("landlords").where({
      id: req.params.id,
    });

    res.json(updatedLandlord[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update landlord with ID ${req.params.id}: ${error}`,
    });
  }
};

//Get all properties of a single landlord by id
const getPropertiesOfALandlordById = async (req, res) => {
  try {
    const properties = await knex("landlords")
      .join("properties", "properties.landlord_id", "landlords.id")
      .where({ landlord_id: req.params.id });

    const landlordPropertyData = properties.map((item) => {
      const {
        id,
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
        message: `Landlord with ID ${req.params.id} is not found`,
      });
    } else {
      res.status(200).json(landlordPropertyData);
    }
  } catch (error) {
    res.status(404).json({
      message: `Unable to retrieve properties of a landlord with ID ${req.params.id}: ${error}`,
    });
  }
};
module.exports = {
  getAllLandlords,
  getLandlordById,
  postNewLandlord,
  deleteLandlordById,
  updateLandlordData,
  getPropertiesOfALandlordById,
};
