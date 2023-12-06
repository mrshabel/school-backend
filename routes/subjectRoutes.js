const express = require("express");
const { restrictsTo } = require("../middleware/auth");
const router = express.Router({ mergeParams: true });
const subjectController = require("../controllers/subjectController");
const teacherRoutes = require("./teacherRoutes");

router.use(restrictsTo);
//nested route
router.use("/:subjectId/teachers", teacherRoutes);

router
  .route("/")
  .post(subjectController.setClassId, subjectController.createSubject)
  .get(subjectController.getAllSubject);

router
  .route("/:id")
  .get(subjectController.getSubject)
  .patch(subjectController.updateSubject)
  .delete(subjectController.deleteSubject);

module.exports = subject = router;
