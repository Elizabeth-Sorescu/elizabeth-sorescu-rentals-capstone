const propertiesData = require("../seed-data/properties");
const tenantsData = require("../seed-data/tenants");
const landlordsData = require("../seed-data/landlords");

exports.seed = async function (knex) {
  await knex("landlords").del();
  await knex("properties").del();
  await knex("tenants").del();

  await knex("landlords").insert(landlordsData);
  await knex("properties").insert(propertiesData);
  await knex("tenants").insert(tenantsData);
};
