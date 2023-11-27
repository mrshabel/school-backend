const Student = require("../models/student");
const AppError = require("../utils/appError");
const {
  addStudentSchema,
  updateStudentSchema,
} = require("../utils/validation");
const catchASync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

//  create new student document
exports.addStudent = catchASync(async (req, res, next) => {
  // validating user input
  const { value, error } = addStudentSchema.validate(req.body);
  if (error) {
    throw new AppError(error.details[0].message, 400);
  }

  const {
    name,
    class: studentClass,
    dob,
    phone,
    address,
    gender,
    parentName,
    parentEmail,
    parentOccupation,
    parentGender,
  } = value;

  // creating student document
  const student = await Student.create({
    name,
    class: studentClass,
    dob,
    displayImage: req.file.filename,
    gender,
    parent: {
      name: parentName,
      email: parentEmail,
      occupation: parentOccupation,
      gender: parentGender,
      phone,
      address,
    },
  });

  return res.status(200).json({
    status: "ok",
    message: "student details added successfully",
    data: student,
  });
});

//  read document of a particular student
exports.getStudent = catchASync(async (req, res, next) => {
  const { id } = req.params;
  const student = await Student.findById(id).populate("parent_id");

  if (!student) {
    throw new AppError("Student not found", 404);
  }

  return res.status(200).json({
    status: "ok",
    message: "student details retrieved successfully",
    data: student,
  });
});

//  delete a student document
exports.deleteStudent = catchASync(async (req, res, next) => {
  const { id } = req.params;

  const student = await Student.findByIdAndDelete(id);

  if (!student) {
    throw new AppError("Student not found", 404);
  }

  return res.status(200).json({
    status: "ok",
    message: "Student records deleted",
  });
});

//  update a student document
exports.updateStudent = catchASync(async (req, res, next) => {
  const { id } = req.params;
  //validating user inputs
  const { value, error } = updateStudentSchema(req.body);

  if (error) {
    throw new AppError(error.details[0].message);
  }

  const student = await Student.findByIdAndUpdate(id, value);

  if (!student) {
    throw new AppError("Student not found", 404);
  }

  res.status(200).json({
    status: "ok",
    message: "student details updated successfully",
  });
});

// all student collection operations here

exports.getAllStudents = catchASync(async (req, res, next) => {
  const features = new APIFeatures(Student.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  // execute query
  const students = await features.query;

  if (!students || students.length === 0) {
    throw new AppError("No student data found", 404);
  }

  return res.status(200).json({
    status: "ok",
    message: "Student records successfully fetched",
    data: {
      count: students.length,
      students,
    },
  });
});
