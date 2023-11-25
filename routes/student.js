const express = require("express");
const router = express.Router();
const {
  addStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
} = require("../controllers/student");
const { restrictsTo } = require("../middleware/auth");
const { uploadStudentPhoto } = require("../middleware/uploadStudentPhoto");

// router.route("/").get(restrictsTo, getAllStudents);
router
  .route("/")
  .get(restrictsTo, getAllStudents)
  .post(restrictsTo, uploadStudentPhoto, addStudent);

router
  .route("/:id")
  .get(restrictsTo, getStudent)
  .patch(restrictsTo, updateStudent)
  .delete(restrictsTo, deleteStudent);

module.exports = router;
