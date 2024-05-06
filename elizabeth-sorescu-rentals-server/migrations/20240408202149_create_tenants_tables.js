/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("tenants", (table) => {
    table.uuid("id").defaultTo(knex.raw("(UUID())")).primary();
    table
      .uuid("property_id")
      .references("id")
      .inTable("properties")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("name", 255).notNullable().defaultTo("Anonymous Tenant");
    table.string("room_location", 255).notNullable().defaultTo("No room");
    table.decimal("monthly_rent").notNullable().defaultTo(0);
    table.timestamp("rent_payment_date").defaultTo(knex.fn.now());

    table
      .string("messages", 255)
      .notNullable()
      .defaultTo(
        "Thank you for choosing Rentals! We're thrilled to welcome you aboard. Your registration is complete, and you're now part of our community."
      );
    table.decimal("rating").notNullable().defaultTo(1);
    table.integer("num_reviews").notNullable().defaultTo(1);
    table.string("email", 255).notNullable().defaultTo("");
    table.string("phone", 255).notNullable().defaultTo("0000000000");
    table.string("password", 255).notNullable().defaultTo("");
    table.string("role", 255).notNullable().defaultTo("tenant");
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
  return knex.schema.dropTable("tenants");
};
