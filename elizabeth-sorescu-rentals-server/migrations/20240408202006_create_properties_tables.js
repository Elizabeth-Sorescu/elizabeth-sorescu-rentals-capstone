/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("properties", (table) => {
    table.increments("id").primary();
    table
      .integer("landlord_id")
      .unsigned()
      .references("landlords.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("property_name", 255).notNullable();
    table.string("street_address", 255).notNullable();
    table.string("city", 255).notNullable();
    table.string("country", 255).notNullable();
    table.string("description", 255).notNullable();
    table.string("type", 255).notNullable();
    table.decimal("monthly_rent").notNullable();
    table.decimal("rating").notNullable();
    table.integer("num_reviews").notNullable();
    table.decimal("mortgage").notNullable();
    table.decimal("strata_fee").notNullable();
    table.decimal("property_tax").notNullable();
    table.decimal("maintenance_fee").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("properties");
};
