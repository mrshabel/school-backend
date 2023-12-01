const Teacher = require("../models/teacherModel");
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
