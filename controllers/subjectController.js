const Subject = require("../models/subjectModel");
const {
  createSubjectSchema,
  updateSubjectSchema,
} = require("../utils/validation");
const factory = require("./handlerFactory");

exports.createSubject = factory.create(Subject, createSubjectSchema);

exports.getSubject = factory.getOne(Subject);

exports.getAllSubject = factory.getAll(Subject);

exports.updateSubject = factory.update(Subject, updateSubjectSchema);

exports.deleteSubject = factory.delete(Subject);

exports.setClassId = async (req, res, next) => {
  if (!req.body.class) req.body.class = req.params.ClassId;

  next();
};
