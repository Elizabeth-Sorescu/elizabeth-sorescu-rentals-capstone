const router = require("express").Router();
const tenantController = require("../controllers/tenant-controller");

//routes handlers
router
  .route("/")
  .get(tenantController.getAllTenants)
  .post(tenantController.postNewTenant);

router
  .route("/:id")
  .get(tenantController.getTenantById)
  .delete(tenantController.deleteTenantById)
  .patch(tenantController.updateTenantData);

// Lists all properties in a specific tenant id
router
  .route("/:id/properties")
  .get(tenantController.getPropertiesOfATenantById);

module.exports = router;
