const Teacher = require("../models/teacherModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const {
  createTeacherSchema,
  updateTeacherSchema,
} = require("../utils/validation");
const factory = require("./handlerFactory");

exports.createTeacher = factory.create(Teacher, createTeacherSchema);

exports.getTeacher = factory.getOne(Teacher);

exports.getAllTeacher = factory.getAll(Teacher);

exports.updateTeacher = factory.update(Teacher, updateTeacherSchema);

exports.deleteTeacher = factory.delete(Teacher);

exports.setClassId = async (req, res, next) => {
  if (!req.body.classId) req.body.class = req.params.classId;
  if (!req.body.subjectId) req.body.subject = req.params.subjectId;
  next();
};
