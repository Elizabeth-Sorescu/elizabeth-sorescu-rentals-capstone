const router = require("express").Router();
const landlordController = require("../controllers/landlord-controller");

//routes handlers
router
  .route("/")
  .get(landlordController.getAllLandlords) //working
  .post(landlordController.postNewLandlord); //working

router
  .route("/:id")
  .get(landlordController.getLandlordById) //working
  .delete(landlordController.deleteLandlordById) //working
  .patch(landlordController.updateLandlordData); //working

// Lists all properties in a specific landlord id
router
  .route("/:id/properties")
  .get(landlordController.getPropertiesOfALandlordById); //working
module.exports = router;
