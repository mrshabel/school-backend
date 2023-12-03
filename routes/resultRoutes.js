const express = require("express");
const { restrictsTo } = require("../middleware/auth");
const router = express.Router({ mergeParams: true });
const resultController = require("../controllers/resultController");

router
  .route("/")
  .post(
    restrictsTo,
    resultController.setStudentId,
    resultController.createResult
  )
  .get(restrictsTo, resultController.getAllResult);

router
  .route("/:id")
  .get(restrictsTo, resultController.getResult)
  .patch(restrictsTo, resultController.updateResult)
  .delete(restrictsTo, resultController.deleteResult);

module.exports = result = router;
