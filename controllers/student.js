const Student = require("../models/student");
const Parent = require("../models/parent");
const appError = require("../utils/appError");
const {
  addStudentSchema,
  updateStudentSchema,
} = require("../utils/validation");
const { paginationParams } = require("../utils/dbQuery");
const catchASync = require("../utils/catchAsync");

//  create new student document
exports.addStudent = catchASync(async (req, res, next) => {
  // validating user input
  const { value, error } = addStudentSchema.validate(req.body);
  if (error) {
    throw new appError(error.details[0].message, 400);
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
  const student = new Student({
    name,
    class: studentClass,
    dob,
    address,
    displayImage: req.file.filename,
    gender,
  });

  // creating parent reference
  const parent = new Parent({
    name: parentName,
    email: parentEmail,
    occupation: parentOccupation,
    gender: parentGender,
    phone,
    address,
  });
  await parent.save();

  student.parent_id = parent._id;
  await student.save();

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
    throw new appError("Student not found", 404);
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
    throw new appError("Student not found", 404);
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
    throw new appError(error.details[0].message);
  }

  const student = await Student.findByIdAndUpdate(id, value);

  if (!student) {
    throw new appError("Student not found", 404);
  }

  res.status(200).json({
    status: "ok",
    message: "student details updated successfully",
  });
});

// all student collection operations here

exports.getAllStudents = catchASync(async (req, res, next) => {
  //filtering
  const queryObject = { ...req.query };
  const excludedFields = ["page", "limit", "sort", "fields"];
  excludedFields.forEach((field) => delete queryObject[field]);

  //advance filtering
  let queryString = JSON.stringify(queryObject);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (match) => `$${match}`
  );

  // Construct a regex pattern for case-insensitive and partial name matching

  // const nameRegex = new RegExp(name, "i");

  let query = Student.find(JSON.parse(queryString));

  // sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  //selecting/projecting fields
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    query = query.select(fields);
  } else {
    query = query.select("-__v");
  }

  // execute query
  const students = await query;

  // const students = await Student.find(query)
  //   .skip(skip)
  //   .limit(limit)
  //   .populate("parent_id");

  if (!students || students.length === 0) {
    throw new appError("No student data found", 404);
  }

  return res.status(200).json({
    status: "ok",
    message: "Student records successfully fetched",
    data: {
      count: students.length,
      // totalCount,
      // page: Number(page),
      // limit: Number(limit),
      students,
    },
  });
});
