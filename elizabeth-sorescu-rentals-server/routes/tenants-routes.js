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

module.exports = router;
