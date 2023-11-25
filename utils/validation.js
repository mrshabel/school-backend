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
exports.addStudentSchema = Joi.object({
  name: Joi.string().lowercase().allow(" ").min(3).max(30).required(),
  class: Joi.string().min(1).required(),
  dob: Joi.date().required(),
  phone: Joi.string().min(10).max(10).required(),
  displayImage: Joi.any(),
  address: Joi.string().lowercase().required(),
  gender: Joi.string().lowercase().valid("male", "female").required(),
  parentName: Joi.string().lowercase().allow(" ").min(3).max(30).required(),
  parentEmail: Joi.string().lowercase().email().required(),
  parentOccupation: Joi.string().lowercase().min(3).required(),
  parentGender: Joi.string().lowercase().valid("male", "female").required(),
});

exports.updateStudentSchema = Joi.object({
  name: Joi.string().lowercase().allow(" ").min(3).max(30),
  class: Joi.string().min(1),
  dob: Joi.date(),
  phone: Joi.string().min(10).max(10),
  displayImage: Joi.any(),
  address: Joi.string().lowercase(),
  gender: Joi.string().lowercase().valid("male", "female"),
  parentName: Joi.string().lowercase().allow(" ").min(3).max(30),
  parentEmail: Joi.string().lowercase().email(),
  parentOccupation: Joi.string().lowercase().min(3),
  parentGender: Joi.string().lowercase().valid("male", "female"),
});
