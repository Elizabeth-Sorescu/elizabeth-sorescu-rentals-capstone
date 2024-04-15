const router = require("express").Router();
const landlordController = require("../controllers/landlord-controller");

//routes handlers of other components and pages
router
  .route("/")
  .get(landlordController.getAllLandlords)
  .post(landlordController.postNewLandlord);

router
  .route("/:id")
  .get(landlordController.getLandlordById)
  .delete(landlordController.deleteLandlordById)
  .patch(landlordController.updateLandlordData);

// Lists all properties in a specific landlord id
router
  .route("/:id/properties")
  .get(landlordController.getPropertiesOfALandlordById);

module.exports = router;
