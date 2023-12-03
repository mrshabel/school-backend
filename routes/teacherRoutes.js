const express = require("express");
const { restrictsTo } = require("../middleware/auth");
const router = express.Router({ mergeParams: true });
const teacherController = require("../controllers/teacherController");
const { uploadTeacherPhoto } = require("../middleware/teacher");
const deleteImageOnError = require("../middleware/deleteImageOnError");

router
  .route("/")
  .post(
    restrictsTo,
    uploadTeacherPhoto,
    teacherController.setClassId,
    teacherController.createTeacher,
    deleteImageOnError
  )
  .get(restrictsTo, teacherController.getAllTeacher);

router
  .route("/:id")
  .get(restrictsTo, teacherController.getTeacher)
  .patch(
    restrictsTo,
    uploadTeacherPhoto,
    teacherController.setClassId,
    teacherController.updateTeacher,
    deleteImageOnError
  )
  .delete(restrictsTo, teacherController.deleteTeacher);

module.exports = teacher = router;
