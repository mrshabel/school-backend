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
  class: Joi.number().min(1).max(9).required(),
  displayImage: Joi.any(),
  dob: Joi.date().required(),
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
  dob: Joi.date(),
  gender: Joi.string().lowercase().valid("male", "female"),
  parent: Joi.object().keys({
    name: Joi.string().lowercase().allow(" ").min(3).max(30),
    address: Joi.string().lowercase(),
    email: Joi.string().lowercase().email(),
    phone: Joi.string().min(10).max(10),
    occupation: Joi.string().lowercase().min(3),
    gender: Joi.string().lowercase().valid("male", "female"),
  }),
});
