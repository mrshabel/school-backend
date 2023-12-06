const express = require("express");
const { restrictsTo } = require("../middleware/auth");
const router = express.Router({ mergeParams: true });
const resultController = require("../controllers/resultController");

router.use(restrictsTo);
router
  .route("/")
  .post(resultController.setStudentId, resultController.createResult)
  .get(restrictsTo, resultController.getAllResult);

router
  .route("/:id")
  .get(resultController.getResult)
  .patch(resultController.updateResult)
  .delete(resultController.deleteResult);

module.exports = result = router;
