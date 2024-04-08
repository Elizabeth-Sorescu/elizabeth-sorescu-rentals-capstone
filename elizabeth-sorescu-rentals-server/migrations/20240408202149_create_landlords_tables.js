/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("landlords", (table) => {
    table.increments("id").primary();
    table
      .integer("property_id")
      .unsigned()
      .references("properties.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("landlord_name", 255).notNullable();
    table.string("messages", 255).notNullable();
    table.decimal("rating").notNullable();
    table.integer("num_reviews").notNullable();
    table.string("email", 255).notNullable();
    table.string("phone", 255).notNullable();
    table.string("password", 255).notNullable();
    table.string("role", 255).notNullable();
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
  return knex.schema.dropTable("landlords");
};
