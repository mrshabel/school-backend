const Joi = require("joi");

// validating user signup
exports.registerSchema = Joi.object({
  name: Joi.string().lowercase().allow(" ").min(3).max(30).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().lowercase().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  phone: Joi.string().min(10).max(10).required(),
  displayImage: Joi.any().required(),
  address: Joi.string().lowercase().required(),
  gender: Joi.string().lowercase().valid("male", "female").required(),
});

exports.loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().required(),
});

// validating student signup
exports.studentSchema = Joi.object({
  name: Joi.string().lowercase().allow(" ").min(3).max(30).required(),
  class: Joi.string().required(),
  displayImage: Joi.any(),
  dob: Joi.date().iso().required(),
  gender: Joi.string().lowercase().valid("male", "female").required(),
  parent: Joi.object().keys({
    name: Joi.string().lowercase().allow(" ").min(3).max(30).required(),
    address: Joi.string().lowercase().required(),
    email: Joi.string().lowercase().email().required(),
    phone: Joi.string().min(10).max(10).required(),
    occupation: Joi.string().lowercase().min(3).required(),
    gender: Joi.string().lowercase().valid("male", "female").required(),
  }),
});

exports.updateStudentSchema = Joi.object({
  name: Joi.string().lowercase().allow(" ").min(3).max(30),
  class: Joi.number().min(1).max(9),
  displayImage: Joi.any(),
  dob: Joi.date().iso(),
  gender: Joi.string().lowercase().valid("male", "female"),
  // parent: Joi.object().keys({
  //   name: Joi.string().lowercase().allow(" ").min(3).max(30),
  //   address: Joi.string().lowercase(),
  //   email: Joi.string().lowercase().email(),
  //   phone: Joi.string().min(10).max(10),
  //   occupation: Joi.string().lowercase().min(3),
  //   gender: Joi.string().lowercase().valid("male", "female"),
  // }),
});

exports.createClassSchema = Joi.object({
  name: Joi.string()
    .valid("1", "2", "3", "4", "5", "6", "7", "8", "9")
    .required(),
  dateFrom: Joi.date().iso().required(),
  dateTo: Joi.date().iso().required(),
});

exports.updateClassSchema = Joi.object({
  name: Joi.string().valid("1", "2", "3", "4", "5", "6", "7", "8", "9"),
  dateFrom: Joi.date().iso(),
  dateTo: Joi.date().iso(),
});

exports.createSubjectSchema = Joi.object({
  name: Joi.string().lowercase().allow(" ").required(),
  code: Joi.string().lowercase().required(),
  class: Joi.string(),
  teacher: Joi.string(),
});

exports.updateSubjectSchema = Joi.object({
  name: Joi.string().lowercase().allow(" "),
  code: Joi.string().lowercase(),
  class: Joi.string(),
  teacher: Joi.string(),
});

exports.createTeacherSchema = Joi.object({
  name: Joi.string().lowercase().allow(" ").min(3).max(30).required(),
  class: Joi.string(),
  subject: Joi.string(),
  email: Joi.string().lowercase().email().required(),
  displayImage: Joi.any(),
  address: Joi.string().lowercase().allow(" ").required(),
  dob: Joi.date().iso().required(),
  gender: Joi.string().lowercase().valid("male", "female").required(),
});

exports.updateTeacherSchema = Joi.object({
  name: Joi.string().lowercase().allow(" ").min(3).max(30),
  class: Joi.string(),
  subject: Joi.string(),
  email: Joi.string().lowercase().email(),
  displayImage: Joi.any(),
  address: Joi.string().lowercase().allow(" "),
  dob: Joi.date().iso(),
  gender: Joi.string().lowercase().valid("male", "female"),
});

exports.createResultSchema = Joi.object({
  type: Joi.string().lowercase().valid("exam", "test", "homework").required(),
  subject: Joi.string().required(),
  score: Joi.number().required(),
});

exports.updateResultSchema = Joi.object({
  type: Joi.string().lowercase().valid("test", "exam", "homework"),
  subject: Joi.string(),
  score: Joi.number(),
});
