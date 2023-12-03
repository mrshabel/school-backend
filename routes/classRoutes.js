const express = require("express");
const router = express.Router();
const classController = require("../controllers/classController");
const { restrictsTo } = require("../middleware/auth");
const subjectRoutes = require("./subjectRoutes");
const teacherRoutes = require("./teacherRoutes");

router.use(restrictsTo);
//nested routes
router.use("/:classId/subjects", subjectRoutes);
router.use("/:classId/teachers", teacherRoutes);

router
  .route("/")
  .get(classController.getAllClass)
  .post(classController.createClass);

router
  .route("/:id")
  .get(classController.getClass)
  .patch(classController.updateClass);

router
  .route("/:id/teachers/:teacherId")
  .patch(classController.updateClassTeacher);

module.exports = studentClass = router;
