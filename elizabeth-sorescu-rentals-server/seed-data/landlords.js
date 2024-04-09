/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports = [
  {
    id: 1,
    landlord_name: "Eli Za",
    messages: "Please fill-in the form for ending the tenancy. Thanks.",
    rating: 4.3,
    num_reviews: 10,
    email: "eli.za@hotmail.com",
    phone: 7763970457,
    password: "test",
    role: "landlord",
  },
  {
    id: 2,
    landlord_name: "Sarah Lee",
    messages: "Reminder: Rent is due by the end of the month. Thank you.",
    rating: 4.8,
    num_reviews: 15,
    email: "sarah.lee@example.com",
    phone: "7781234567",
    password: "test",
    role: "landlord",
  },
  {
    id: 3,
    landlord_name: "Jack Smith",
    messages:
      "Maintenance work will be conducted next week. Please ensure availability.",
    rating: 4.5,
    num_reviews: 12,
    email: "jack.smith@example.com",
    phone: "7789876543",
    password: "test",
    role: "landlord",
  },
];
