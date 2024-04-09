const router = require("express").Router();
const propertyController = require("../controllers/property-controller");

//routes handlers
router
  .route("/")
  .get(propertyController.getAllProperties) //working
  .post(propertyController.postNewProperty); //w

router
  .route("/:id")
  .get(propertyController.getPropertyById) //w
  .delete(propertyController.deletePropertyById) //w
  .patch(propertyController.updatePropertyData); //w

// Lists all tenants in a specific property id
router.route("/:id/tenants").get(propertyController.getTenantsOfAPropertydById); //w
module.exports = router;
