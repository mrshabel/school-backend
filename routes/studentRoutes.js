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

router.use(restrictsTo)
// nested routes
router.use("/:studentId/results", resultRoutes);

router
  .route("/")
  .get(getAllStudents)
  .post(
    uploadStudentPhoto,
    setStudentParents,
    createStudent,
    deleteImageOnError
  );

router
  .route("/:id")
  .get(getStudent)
  .patch(
    uploadStudentPhoto,
    setStudentParents,
    updateStudent,
    deleteImageOnError
  )
  .delete(deleteStudent);

module.exports = router;
