const router = require("express").Router();
const landlordController = require("../controllers/landlord-controller");

router
  .route("/")
  .get(landlordController.getAllLandlords)
  .post(landlordController.postNewLandlord);

router
  .route("/:id")
  .get(landlordController.getLandlordById)
  .delete(landlordController.deleteLandlordById)
  .patch(landlordController.updateLandlordData);

router
  .route("/:id/properties")
  .get(landlordController.getPropertiesOfALandlordById);

module.exports = router;
