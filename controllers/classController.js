const ClassModel = require("../models/classModel");
const TeacherModel = require("../models/teacherModel");
const catchAsync = require("../utils/catchAsync");
const { createClassSchema, updateClassSchema } = require("../utils/validation");
const factory = require("./handlerFactory");

exports.createClass = factory.create(ClassModel, createClassSchema);

exports.updateClass = factory.update(ClassModel, updateClassSchema);

exports.getClass = factory.getOne(ClassModel);

exports.getAllClass = factory.getAll(ClassModel);

exports.updateClassTeacher = catchAsync(async (req, res, next) => {
  console.log(req.params);
  const teacher = await TeacherModel.findByIdAndUpdate(
    req.params.teacherId,
    {
      class: req.params.id,
    },
    { new: true }
  );

  if (!teacher) throw new AppError("No teacher ID provided", 404);

  return res.status(200).json({
    message: "Teacher assigned to class",
    data: teacher,
  });
});
