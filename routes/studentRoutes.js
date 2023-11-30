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

// router.route("/").get(restrictsTo, getAllStudents);
router
  .route("/")
  .get(restrictsTo, getAllStudents)
  .post(restrictsTo, uploadStudentPhoto, setStudentParents, createStudent);

router
  .route("/:id")
  .get(restrictsTo, getStudent)
  .patch(restrictsTo, uploadStudentPhoto, setStudentParents, updateStudent)
  .delete(restrictsTo, deleteStudent);

module.exports = router;
