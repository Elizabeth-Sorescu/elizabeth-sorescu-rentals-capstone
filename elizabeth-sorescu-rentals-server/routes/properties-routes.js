const router = require("express").Router();
const propertyController = require("../controllers/property-controller");

//routes handlers
router
  .route("/")
  .get(propertyController.getAllProperties)
  .post(propertyController.postNewProperty);

router
  .route("/:id")
  .get(propertyController.getPropertyById)
  .delete(propertyController.deletePropertyById)
  .patch(propertyController.updatePropertyData);

// Lists all tenants in a specific property id
router.route("/:id/tenants").get(propertyController.getTenantsOfAPropertydById);
module.exports = router;
