/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports = [
  {
    id: 1,
    name: "Eli Za",
    messages: "Please fill-in the form for ending the tenancy. Thanks.",
    rating: 4.3,
    num_reviews: 10,
    email: "eli.za@gmail.com",
    phone: 7763970457,
    password: "$2a$10$/fFO0Xz6YzkDomjiVCNFSOu1Zd44j7E9DY4R2nj.9yQ02lRbZK.si",
    role: "landlord",
  },
  {
    id: 2,
    name: "Esther Lee",
    messages: "Reminder: Rent is due by the end of the month. Thank you.",
    rating: 4.8,
    num_reviews: 15,
    email: "esther.lee@gmail.com",
    phone: "7781234567",
    password: "$2a$10$/fFO0Xz6YzkDomjiVCNFSOu1Zd44j7E9DY4R2nj.9yQ02lRbZK.si",
    role: "landlord",
  },
  {
    id: 3,
    name: "Marius Smith",
    messages:
      "Maintenance work will be conducted next week. Please ensure availability.",
    rating: 4.5,
    num_reviews: 12,
    email: "marius.smith@gmail.com",
    phone: "7789876543",
    password: "$2a$10$/fFO0Xz6YzkDomjiVCNFSOu1Zd44j7E9DY4R2nj.9yQ02lRbZK.si",
    role: "landlord",
  },
];
