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
      .references("id")
      .inTable("landlords")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .string("property_name", 255)
      .notNullable()
      .defaultTo("Unknown property");
    table
      .string("street_address", 255)
      .notNullable()
      .defaultTo("Unknown address");
    table.string("city", 255).notNullable().defaultTo("Unknown city");
    table.string("country", 255).notNullable().defaultTo("Unknown country");
    table
      .string("description", 255)
      .notNullable()
      .defaultTo("Unknown description");
    table.string("type", 255).notNullable().defaultTo("Unknown type");
    table.decimal("monthly_rent").notNullable().defaultTo(0);
    table.decimal("rating").notNullable().defaultTo(1);
    table.integer("num_reviews").notNullable().defaultTo(1);
    table.decimal("mortgage").notNullable().defaultTo(0);
    table.decimal("strata_fee").notNullable().defaultTo(0);
    table.decimal("property_tax").notNullable().defaultTo(0);
    table.decimal("property_insurance").notNullable().defaultTo(0);
    table.decimal("maintenance_fee").notNullable().defaultTo(0);
    table.decimal("other_fees").notNullable().defaultTo(0);
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
