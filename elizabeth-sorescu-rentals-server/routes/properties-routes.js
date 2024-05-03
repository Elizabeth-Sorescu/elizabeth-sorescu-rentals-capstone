const router = require("express").Router();
const propertyController = require("../controllers/property-controller");

router
  .route("/")
  .get(propertyController.getAllProperties)
  .post(propertyController.postNewProperty);

router
  .route("/:id")
  .get(propertyController.getPropertyById)
  .delete(propertyController.deletePropertyById)
  .patch(propertyController.updatePropertyData);

router.route("/:id/tenants").get(propertyController.getTenantsOfAPropertydById);
module.exports = router;
