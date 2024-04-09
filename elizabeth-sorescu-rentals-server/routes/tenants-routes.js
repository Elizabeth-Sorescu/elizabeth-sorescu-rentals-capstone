const router = require("express").Router();
const tenantController = require("../controllers/tenant-controller");

//routes handlers
router
  .route("/")
  .get(tenantController.getAllTenants) //w
  .post(tenantController.postNewTenant); //w

router
  .route("/:id")
  .get(tenantController.getTenantById) //w
  .delete(tenantController.deleteTenantById) //w
  .patch(tenantController.updateTenantData); //w

// // Lists all properties in a specific landlord id
// router.route("/:id/tenants").get(propertyController.getTenantsOfAPropertydById);
module.exports = router;
