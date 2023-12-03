const express = require("express");
const { restrictsTo } = require("../middleware/auth");
const router = express.Router({ mergeParams: true });
const subjectController = require("../controllers/subjectController");
const teacherRoutes = require("./teacherRoutes");

//nested route
router.use("/:subjectId/teachers", teacherRoutes);

router
  .route("/")
  .post(
    restrictsTo,
    subjectController.setClassId,
    subjectController.createSubject
  )
  .get(restrictsTo, subjectController.getAllSubject);

router
  .route("/:id")
  .get(restrictsTo, subjectController.getSubject)
  .patch(restrictsTo, subjectController.updateSubject)
  .delete(restrictsTo, subjectController.deleteSubject);

module.exports = subject = router;
