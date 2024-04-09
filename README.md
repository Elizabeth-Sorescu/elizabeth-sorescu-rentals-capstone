# Project Title

Rentals (Tenant and Landlord Rental System Application)

## Overview

Rentals is an innovative application designed to streamline the relationship between landlords and tenants, eliminating the need for a third-party intermediary like a property management company or manager. This platform provides a comprehensive solution for managing rental properties efficiently and effectively, offering a range of features tailored to meet the needs of both landlords and tenants.

By connecting landlords and tenants directly through the Rentals application, both parties can enjoy greater transparency, communication, and efficiency in their rental transactions. With its user-friendly interface and comprehensive feature set, Rentals is revolutionizing the way rental properties are managed, making the process simpler and more convenient for everyone involved.

### Problem

1. The expense of Hiring Property Management: Landlords with a limited number of rental properties often find it financially burdensome to hire a project manager for property management. This expense, added to the overall costs, including maintenance and taxes, significantly increases the rental price for tenants, making it less competitive in the market.

2. Ineffective Communication Channels: Tenants frequently encounter difficulties in directly addressing concerns about their rental units to the management team hired by the landlord. This lack of direct communication leads to delays in resolving issues and dissatisfaction among tenants.

3. Tedious Communication Process: Landlords face challenges in communicating important matters with tenants due to the need to navigate through various contact lists or email addresses. This cumbersome process consumes time and leads to inefficiencies in addressing urgent matters.

4. Fragmented Documentation Management: Important documentation such as tenant applications, rental agreements, invoices, and receipts are scattered across different applications or stored locally on computers or physically at home. This fragmented approach to documentation management creates inconvenience and potential risks of data loss or mismanagement for both landlords and tenants.

5. Complex Resolution Processes: Resolving rental-related issues often involves a lengthy and complex process, potentially requiring escalation to regulatory bodies such as the Tenancy Regulation Branch. This bureaucratic process prolongs the resolution of disputes and adds stress for both landlords and tenants.

6. Lack of Immediate Resolution Mechanism: Landlords and tenants encounter challenges in promptly addressing misunderstandings and issues related to rental properties. The absence of a streamlined mechanism for submitting formal requests and resolutions prolongs the resolution process and exacerbates tensions between parties.

The Rentals Application offers solutions to these problems by providing a cost-effective alternative to traditional property management, facilitating direct communication between landlords and tenants, streamlining communication channels, centralizing documentation management, and offering a platform for efficient conflict resolution.

### User Profile

Landlords:
-owns one or more rental properties and is responsible for overseeing various aspects of property management; ensuring the smooth operation of rental properties;
-monitoring each property's rent payments;
-addressing repair requests;
-communicating directly with tenants;
-complying with legal obligations related to rental agreements and property maintenance by actively managing rental properties and maintaining tenant satisfaction;
-maximize the return on investment while providing safe and habitable living spaces for tenants.

Tenants:
-occupies a rental property under a lease agreement with the landlord.
-responsible for monitoring communication-related to the rental unit, including invoices, payments, and receipts.
-Responsible for creating repair and other requests to the landlord for repair within the rental unit or property.
-have the ability to communicate directly with the landlord to address any concerns, queries, or issues about the rental unit, lease agreement, or property management.
-maintaining the condition of the rental property and upholding their responsibilities as outlined in the lease agreement while enjoying the rights and privileges afforded to them as tenants.

### Features

Landlord User: Property Management

As a logged-in landlord user, I want to be able to view all of my properties that are for rent.
As a logged-in landlord user, I want to be able to view all of the tenants on each property.
As a logged-in landlord user, I want to remember/recognize all of the tenants' details such as names, contact information, and the number of occupants in each property.
As a logged-in landlord user, I want to communicate directly with tenants grouped in a specific property.
As a logged-in landlord user, I want to create and receive tenant notices and keep a documented copy of them.
As a logged-in landlord user, I want to address tenants' requests directly in one application at any time, wherever I may be.
As a logged-in landlord user, I want to be able to rate tenants at the end of their tenancy.

Landlord User: Financial Management

As a logged-in landlord user, I want to receive direct rent payments and send a receipt.
As a logged-in landlord user, I want to be able to monitor yearly rent income received and expenses for easy filing of annual tax.

Tenant User: Rental Management

As a logged-in tenant user, I want to be able to view the property(ies) I am currently renting.
As a logged-in tenant user, I want to communicate directly with the landlord through chats and documents.
As a logged-in tenant user, I want to be able to send request forms to the landlord.
As a logged-in tenant user, I want to be able to rate a landlord and a property out of 5 stars/points at the end of my tenancy

Tenant User: Financial Management

As a logged-in tenant user, I want to be able to pay and receive a receipt of payment directly.
As a logged-in tenant user, I want to monitor and view payments made.

## Implementation

The scope of implementation for this project is limited to executing Phase 1, ensuring compliance with the project's final submission deadline on April 27, 2024. Phase 1 will focus on creating mobile and tablet responsiveness while maintaining flexibility for desktop viewing. However, it's important to note that this project will continue to progress beyond Phase 1 implementation.

Key components of Phase 1 implementation include:

Mobile Responsiveness:

• Develop a responsive layout optimized for viewing and interaction on various mobile devices, prioritizing usability and accessibility.
• Implement fluid layout techniques to ensure seamless adaptation to different screen sizes and resolutions.
• Enhance touch interactions, navigation menus, and content readability to provide an optimal user experience on mobile devices.

Tablet Responsiveness:

• Extend responsive design principles to accommodate larger screen sizes typical of tablets.
• Ensure consistency in user experience and visual appeal across different tablet devices.
• Test and refine the layout to address specific challenges associated with tablet usage, optimizing for touch and gestures.

Desktop Flexibility:

• Ensure that the design remains flexible and adaptable for desktop viewing, while maintaining compatibility with mobile and tablet devices.
• Implement responsive breakpoints and design adjustments to enhance the desktop experience without compromising other device views.
• Utilize progressive enhancement techniques to leverage desktop capabilities while maintaining cross-device compatibility.
• While the initial focus is on Phase 1 objectives, it's important to acknowledge that this project will evolve beyond this phase. Future phases may include additional features, improvements, and iterations based on user feedback, technological advancements, and changing requirements.

• A project team will maintain flexibility and adaptability to accommodate these changes, ensuring that the project continues to progress effectively toward its overarching goals beyond the initial Phase 1 implementation.

### Tech Stack

- React
- TypeScript
- MySQL
- Express
- Client libraries:
  - react
  - react-router
  - axios
- Server libraries:
  - knex
  - express

### APIs

- No external APIs will be used for the first sprint

### Sitemap

Phase 1: (Timeline: April 8 – 27, 2024)

- Welcome Page (for all users)
- Login Page (for Landlord and Tenant users)
- Rental Properties List Page (for Landlord User)
- Add Property to the Rental Properties List (for Landlord User)
- Property Details with Tenants List (for Landlord User)

- Rental Properties List Page (for Tenant User)

Phase 2: (This phase will not be implemented yet)
Add New Tenant
Edit Property
Property Annual Record
Property Details of Tenant-Occupied Unit

Phase 3: (This phase will not be implemented yet)
Landlord’s Chat with Tenants Feature
View Tenant Details
Tenant’s Chat with the specific property’s landlord feature

Phase 4: (This phase will not be implemented yet)
Landlord’s rating feature functionality
Tenant’s rating feature functionality

### Mockups

#### Welcome Page

![](welcome-page-mobile.png)

#### Sign Up Page

![](register-page-mobile.png)

#### Login Page

![](login-page-mobile.png)

### Add Property Page

![](add-property-page.png)

#### Properties List Page

![](properties-list-page-mobile.png)

#### Properties List Page Tenant

![](properties-list-page-tenant-mobile.png)

#### Property Details Container Page

![](property-details-container-page.png)

### Data

![](sql-rentals-diagram.png)

### Database

- To connect to the proper database of this project, use the following in the .env file:

  PORT=8080

  DB_HOST=127.0.0.1

  DB_LOCAL_DBNAME=rentals

  DB_LOCAL_USER=root

  DB_LOCAL_PASSWORD=rootroot

### Endpoints

**PHASE I**

** GET Localhost:8080/api/properties **

- Get all properties if the user is logged in

- Response body example:
  [
  {
  id: 1,
  landlord_id: 1,
  property_name: "New Westminster",
  street_address: "1115 Rupert avenue",
  city: "New Westminster",
  country: "Canada",
  description: "3BR 2BA",
  type: "Townhome",
  monthly_rent: 3500,
  rating: 4.8,
  num_reviews: 11,
  mortgage: 3700,
  strata_fee: 250,
  property_tax: 278.33,
  maintenance_fee: 600,
  },
  {
  id: 2,
  landlord_id: 1,
  property_name: "South Surrey",
  address: "28 avenue 160 St.",
  city: " South Surrey ",
  country: "Canada",
  description: "6BR 3BA",
  type: "House",
  monthly_rent: "5500",
  rating: 4.5,
  num_reviews: 8,
  mortgage: 5500,
  strata_fee: 0,
  property_tax: 375,
  maintenance_fee: 1000,
  },
  ...
  ]

** POST /api/properties **

- Post a new property

- Request body example:
  [
  {
  property_name: "Richmond",
  street_address: "789 No. 3 Road",
  city: "Richmond",
  country: "Canada",
  description: "1BR 1BA",
  type: "Loft",
  monthly_rent: 2000,
  rating: 4.6,
  num_reviews: 9,
  mortgage: 2200,
  strata_fee: 150,
  property_tax: 150,
  maintenance_fee: 300,
  }
  • Response returns 400 if unsuccessful because of missing properties in the request bodyResponse returns 201 if successful
  • Response body example:
  {
  id: 4,
  landlord_id: 2,
  property_name: "Richmond",
  street_address: "789 No. 3 Road",
  city: "Richmond",
  country: "Canada",
  description: "1BR 1BA",
  type: "Loft",
  monthly_rent: 2000,
  rating: 4.6,
  num_reviews: 9,
  mortgage: 2200,
  strata_fee: 150,
  property_tax: 150,
  maintenance_fee: 300,
  }
  ]
  ** GET /api/properties/:id **

- Get a single property given a specific id

Parameters:

- id : property id as number

- Response body example:
  {
  id: 3,
  landlord_id: 1,
  property_name: "Vancouver",
  address: "1133 Hornby St",
  city: "Vancouver",
  country: "Canada",
  description: "1BR 1BA",
  type: "Condominium",
  monthly_rent: "2500",
  rating: 4.8,
  num_reviews: 10,
  mortgage: 3500,
  strata_fee: 300,
  property_tax: 350,
  maintenance_fee: 500,
  }

** GET /api/properties/:id/tenants **

- Get a list of all tenants with a specific id of a property

Parameters:

-id : property id as number

- /api/properties/1/tenants
- Response body example:
  [
  {
  id: 1,
  property_id: 1,
  tenant_name: "Marie Taylor",
  room_location: "1: Master bedroom",
  monthly_rent: 650,
  messages: "I created a request for the washer repair.",
  rating: 4.9,
  num_reviews: 11,
  email: "marie.taylor@gmail.com",
  phone: 6046532357,
  password: "test",
  role: "tenant",
  },
  {
  id: 2,
  property_id: 1,
  tenant_name: "Mercedez Muga",
  room_location: "1: Master bedroom",
  monthly_rent: 650,
  messages: "I cannot pay this month's rent",
  rating: 4.5,
  num_reviews: 9,
  email: "mercedez.muga @hotmail.com",
  phone: "7783462457",
  password: "test",
  role: "tenant",
  },
  {
  id: 3,
  property_id: 1,
  tenant_name: "Glory Lin",
  room_location: "2: Single room west-side",
  monthly_rent: 1100,
  messages: "I lost the mail key.",
  rating: 4.6,
  num_reviews: 5,
  email: "glory.lin@hotmail.com",
  phone: "2363570864",
  },
  {
  id: 4,
  property_id: 1,
  tenant_name: "Esther Victoria",
  room_location: "2: Single room east-side",
  monthly_rent: 1100,
  messages: "I just fill in the form to end my tenancy by June.",
  rating: 4.5,
  num_reviews: 9,
  email: "esther.victoria@yahoo.com",
  phone: "6049865689",
  password: "test",
  role: "tenant",
  },
  ...
  ]

** GET /api/tenants **

-Get all tenants from all properties

- Response body example:
  [
  {
  id: 1,
  property_id: 1,
  tenant_name: "Marie Taylor",
  room_location: "1: Master bedroom",
  monthly_rent: 650,
  messages: "I created a request for the washer repair.",
  rating: 4.9,
  num_reviews: 11,
  email: "marie.taylor@gmail.com",
  phone: 6046532357,
  password: "test",
  role: "tenant",
  },
  {
  id: 2,
  property_id: 1,
  tenant_name: "Mercedez Muga",
  room_location: "1: Master bedroom",
  monthly_rent: 650,
  messages: "I cannot pay this month's rent",
  rating: 4.5,
  num_reviews: 9,
  email: "mercedez.muga @hotmail.com",
  phone: "7783462457",
  password: "test",
  role: "tenant",
  },
  {
  id: 3,
  property_id: 1,
  tenant_name: "Glory Lin",
  room_location: "2: Single room west-side",
  monthly_rent: 1100,
  messages: "I lost the mail key.",
  rating: 4.6,
  num_reviews: 5,
  email: "glory.lin@hotmail.com",
  phone: "2363570864",
  }
  ...
  ]

### Auth

- JWT auth
  - Auth is not applied during the signup and login of Phase 1
  - Before adding auth, all API requests will be using a fake user with id 1
  - Added after core features of Phase 1 have first been implemented
  - Store JWT in localStorage, remove when a user logs out
  - Add states for logged in showing different UI in places listed in mockups

## Roadmap

Phase 1: Sprint 1 (Week 1)

- Create client

  - react project with routes and boilerplate pages

- Create server

  - express project with routing, with placeholder 20 responses

- Create migrations

- Gather 15 sample properties in different cities

- Create seeds with sample properties, tenants and landlords data

- Deploy client and server projects so all commits will be reflected in production

-Feature: List all properties of a landlord

    - Implement a list of all properties page
    - Create GET /api/ properties

Phase 1: Sprint 2 (Week 2)
-Feature: List a single property with specific id of the landlord

    - Implement a single property page
    - Create GET /api/ properties/:id

-Feature: Post a single property with specific id of the landlord

    - Implement an add single property page
    - Create POST /api/properties

-Feature: List all tenants of all properties of the landlord

    - Implement a list of all tenants at the backend
    - Create GET /api/tenants

Phase 1: Sprint 3 (Week 3)
-Feature: List all tenants with specific if of a property of the landlord

    - Implement a view of a list of all tenants page of a specific property's id
    - Create GET /api/properties/:id/tenants

- Feature: Home page

- Feature: Create account

  - Implement sign up page + form
  - Create POST /users/register endpoint

- Feature: Login

  - Implement login page + form
  - Create POST /users/login endpoint

- Bug fixes

- DEMO DAY

## Nice-to-haves

Phase 2: (This phase will not be implemented yet)
Add New Tenant
Edit Property
Property Annual Record
Property Details of Tenant-Occupied Unit

Phase 3: (This phase will not be implemented yet)
Landlord’s Chat with Tenants Feature
View Tenant Details
Tenant’s Chat with the specific property’s landlord feature

Phase 4: (This phase will not be implemented yet)

- Feature: Rate landlords and tenants
  - Add form input to view ratings page
  - Create POST /ratings
  - States for add & update ratings

Phase 5: (This phase will not be implemented yet)

- Feature: Implement JWT tokens

  - Server: Update expected requests / responses on protected endpoints
  - Client: Store JWT in local storage, include JWT on axios calls

## About

- This repository is developed as my BrainStation Capstone project, aiming to streamline property rental management for individuals like myself who have diverse commitments beyond this interest. I aspire to create a solution that not only simplifies rental management but also enhances the overall experience for property landlords and tenants alike.

## References

- Green House Circle Icon
  https://www.123rf.com/photo_15843360_home-icon-glossy-green-button.html

- ChatGpt
  https://chat.openai.com/

- Social Media Icons
  https://icons8.com/icon/set/social-media/group-decorative

- Figma for UI Design Tool
  https://www.figma.com/

- Draw SQL DB Schema Diagram Tool
  https://drawsql.app/teams/eli-rental-team/diagrams/eli-proj
