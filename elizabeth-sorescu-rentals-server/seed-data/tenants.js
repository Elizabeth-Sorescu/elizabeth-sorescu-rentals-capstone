/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports = [
  {
    id: 1,
    property_id: 1,
    name: "Marie Taylor",
    room_location: "1: Master bedroom",
    monthly_rent: 650,
    rent_payment_date: "2024/05/01",
    messages: "I created a request for the washer repair.",
    rating: 4.9,
    num_reviews: 11,
    email: "marie.taylor@gmail.com",
    phone: 6046532357,
    password: "$2a$10$/fFO0Xz6YzkDomjiVCNFSOu1Zd44j7E9DY4R2nj.9yQ02lRbZK.si",
    role: "tenant",
  },
  {
    id: 2,
    property_id: 1,
    name: "Mercedez Muga",
    room_location: "1: Master bedroom",
    monthly_rent: 650,
    rent_payment_date: "2024/05/02",
    messages: "I cannot pay this month's rent",
    rating: 4.5,
    num_reviews: 9,
    email: "mercedez.muga @hotmail.com",
    phone: "7783462457",
    password: "$2a$10$/fFO0Xz6YzkDomjiVCNFSOu1Zd44j7E9DY4R2nj.9yQ02lRbZK.si",
    role: "tenant",
  },
  {
    id: 3,
    property_id: 1,
    name: "Glory Lin",
    room_location: "2: Single room west-side",
    monthly_rent: 1100,
    rent_payment_date: "2024/05/01",
    messages: "I lost the mail key.",
    rating: 4.6,
    num_reviews: 5,
    email: "glory.lin@hotmail.com",
    phone: "2363570864",
    password: "$2a$10$/fFO0Xz6YzkDomjiVCNFSOu1Zd44j7E9DY4R2nj.9yQ02lRbZK.si",
    role: "tenant",
  },
  {
    id: 4,
    property_id: 1,
    name: "Esther Victoria",
    room_location: "3: Single room east-side",
    monthly_rent: 1100,
    rent_payment_date: "2024/05/01",
    messages: "I just fill in the form to end my tenancy by June.",
    rating: 4.5,
    num_reviews: 9,
    email: "esther.victoria@yahoo.com",
    phone: "6049865689",
    password: "$2a$10$/fFO0Xz6YzkDomjiVCNFSOu1Zd44j7E9DY4R2nj.9yQ02lRbZK.si",
    role: "tenant",
  },
  {
    id: 5,
    property_id: 2,
    name: "Anne Smith",
    room_location: "1: 2nd floor south-side",
    monthly_rent: 900,
    rent_payment_date: "2024/05/01",
    messages: "Is there parking available for visitors?",
    rating: 4.8,
    num_reviews: 12,
    email: "anne.smith@gmail.com",
    phone: "7781234567",
    password: "$2a$10$/fFO0Xz6YzkDomjiVCNFSOu1Zd44j7E9DY4R2nj.9yQ02lRbZK.si",
    role: "tenant",
  },

  {
    id: 6,
    property_id: 2,
    name: "Mary Cruz",
    room_location: "2: 2nd floor east-side",
    monthly_rent: 900,
    rent_payment_date: "2024/05/01",
    messages: "Are utilities included in the rent?",
    rating: 4.7,
    num_reviews: 11,
    email: "mary.cruz@yahoo.com",
    phone: "7783456789",
    password: "$2a$10$/fFO0Xz6YzkDomjiVCNFSOu1Zd44j7E9DY4R2nj.9yQ02lRbZK.si",
    role: "tenant",
  },
  {
    id: 7,
    property_id: 2,
    name: "Alice Kim",
    room_location: "3: 2nd floor west-side",
    monthly_rent: 900,
    rent_payment_date: "2024/05/01",
    messages: "Can I bring my pet cat?",
    rating: 4.2,
    num_reviews: 7,
    email: "alice.kim@hotmail.com",
    phone: "6047654321",
    password: "$2a$10$/fFO0Xz6YzkDomjiVCNFSOu1Zd44j7E9DY4R2nj.9yQ02lRbZK.si",
    role: "tenant",
  },
  {
    id: 8,
    property_id: 2,
    name: "Danica Santos",
    room_location: "4: 1st floor room",
    monthly_rent: 900,
    rent_payment_date: "2024/05/01",
    messages:
      "Could you please provide more information about the lease terms?",
    rating: 4.6,
    num_reviews: 10,
    email: "danica.santos@outlook.com",
    phone: "7789876543",
    password: "$2a$10$/fFO0Xz6YzkDomjiVCNFSOu1Zd44j7E9DY4R2nj.9yQ02lRbZK.si",
    role: "tenant",
  },
  {
    id: 9,
    property_id: 2,
    name: "Emma Garcia",
    room_location: "5: Basement east-side",
    monthly_rent: 900,
    rent_payment_date: "2024/05/01",
    messages: "When is the move-in date for this property?",
    rating: 4.3,
    num_reviews: 8,
    email: "emma.garcia@gmail.com",
    phone: "6042345678",
    password: "$2a$10$/fFO0Xz6YzkDomjiVCNFSOu1Zd44j7E9DY4R2nj.9yQ02lRbZK.si",
    role: "tenant",
  },
  {
    id: 10,
    property_id: 2,
    name: "Emily Chui",
    room_location: "6: Basement west-side",
    monthly_rent: 900,
    rent_payment_date: "2024/05/01",
    messages: "When is the move-in date for this property?",
    rating: 4.3,
    num_reviews: 8,
    email: "emily.chui@outlook.com",
    phone: "2364569753",
    password: "$2a$10$/fFO0Xz6YzkDomjiVCNFSOu1Zd44j7E9DY4R2nj.9yQ02lRbZK.si",
    role: "tenant",
  },
  {
    id: 11,
    property_id: 6,
    name: "Carla Aquino",
    room_location: "3: Study room",
    monthly_rent: 2500,
    rent_payment_date: "2024/05/01",
    messages: "Are utilities included in the rent?",
    rating: 4.7,
    num_reviews: 11,
    email: "carla.aquino@yahoo.com",
    phone: "7782348905",
    password: "$2a$10$/fFO0Xz6YzkDomjiVCNFSOu1Zd44j7E9DY4R2nj.9yQ02lRbZK.si",
    role: "tenant",
  },
];
