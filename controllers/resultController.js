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
