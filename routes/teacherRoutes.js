const express = require("express");
const { restrictsTo } = require("../middleware/auth");
const router = express.Router({ mergeParams: true });
const teacherController = require("../controllers/teacherController");
const { uploadTeacherPhoto } = require("../middleware/teacher");
const deleteImageOnError = require("../middleware/deleteImageOnError");

router.use(restrictsTo)
router
  .route("/")
  .post(
    uploadTeacherPhoto,
    teacherController.setClassId,
    teacherController.createTeacher,
    deleteImageOnError
  )
  .get(teacherController.getAllTeacher);

router
  .route("/:id")
  .get(teacherController.getTeacher)
  .patch(
    uploadTeacherPhoto,
    teacherController.setClassId,
    teacherController.updateTeacher,
    deleteImageOnError
  )
  .delete(teacherController.deleteTeacher);

module.exports = teacher = router;
