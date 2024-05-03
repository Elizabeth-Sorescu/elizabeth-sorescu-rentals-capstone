const router = require("express").Router();
const tenantController = require("../controllers/tenant-controller");

router
  .route("/")
  .get(tenantController.getAllTenants)
  .post(tenantController.postNewTenant);

router
  .route("/:id")
  .get(tenantController.getTenantById)
  .delete(tenantController.deleteTenantById)
  .patch(tenantController.updateTenantData);

router
  .route("/:id/properties")
  .get(tenantController.getPropertiesOfATenantById);

module.exports = router;
