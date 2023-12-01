const ClassModel = require("../models/classModel");
const { createClassSchema, updateClassSchema } = require("../utils/validation");
const factory = require("./handlerFactory");

exports.createClass = factory.create(ClassModel, createClassSchema);

exports.updateClass = factory.update(ClassModel, updateClassSchema);

exports.getClass = factory.getOne(ClassModel);

exports.getAllClass = factory.getAll(ClassModel);
