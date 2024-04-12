/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("landlords", (table) => {
    table.increments("id").primary();
    table.string("name", 255).notNullable();
    table
      .string("messages", 255)
      .notNullable()
      .defaultTo(
        "Thank you for choosing Rentals! We're thrilled to welcome you aboard. Your registration is complete, and you're now part of our community."
      );
    table.decimal("rating").notNullable().defaultTo("1");
    table.integer("num_reviews").notNullable().defaultTo("1");
    table.string("email", 255).notNullable().defaultTo("");
    table.string("phone", 255).notNullable().defaultTo("");
    table.string("password", 255).notNullable().defaultTo("");
    table.string("role", 255).notNullable().defaultTo("landlord");
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
