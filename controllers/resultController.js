const Result = require("../models/resultModel");
const {
  createResultSchema,
  updateResultSchema,
} = require("../utils/validation");
const factory = require("./handlerFactory");

exports.createResult = factory.create(Result, createResultSchema);

exports.getResult = factory.getOne(Result);

exports.getAllResult = factory.getAll(Result);

exports.updateResult = factory.update(Result, updateResultSchema);

exports.deleteResult = factory.delete(Result);

exports.setStudentId = async (req, res, next) => {
  if (!req.body.studentId) req.body.student = req.params.studentId;

  next();
};
