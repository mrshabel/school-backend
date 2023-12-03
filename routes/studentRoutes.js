const express = require("express");
const router = express.Router();
const {
  getStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
  createStudent,
} = require("../controllers/studentController");
const { restrictsTo } = require("../middleware/auth");
const {
  setStudentParents,
  uploadStudentPhoto,
} = require("../middleware/student");
const resultRoutes = require("./resultRoutes");
const deleteImageOnError = require("../middleware/deleteImageOnError");

// nested routes
router.use("/:studentId/results", resultRoutes);

router
  .route("/")
  .get(restrictsTo, getAllStudents)
  .post(
    restrictsTo,
    uploadStudentPhoto,
    setStudentParents,
    createStudent,
    deleteImageOnError
  );

router
  .route("/:id")
  .get(restrictsTo, getStudent)
  .patch(
    restrictsTo,
    uploadStudentPhoto,
    setStudentParents,
    updateStudent,
    deleteImageOnError
  )
  .delete(restrictsTo, deleteStudent);

module.exports = router;
