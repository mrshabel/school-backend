const ApiFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.create = (Model, validator) =>
  catchAsync(async (req, res, next) => {
    if (req.file) {
      req.body.displayImage = req.file.filename;
    }

    const { value, error } = validator.validate(req.body);
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }
    const data = await Model.create(value);

    return res.status(201).json({
      message: "Document created successfully",
      data,
    });
  });

exports.update = (Model, validator) =>
  catchAsync(async (req, res, next) => {
    const { value, error } = validator.validate(req.body);

    if (error) throw new AppError(error.details[0].message, 400);

    const data = await Model.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });

    if (!data) throw new AppError("No document found with that ID", 404);

    return res.status(200).json({
      message: "Document updated successfully",
      data,
    });
  });

exports.delete = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.findByIdAndDelete(req.params.id);

    if (!data) throw new AppError("No document found with that ID", 404);

    return res.status(200).json({
      message: "Document deleted successfully",
      data: null,
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.findById(req.params.id).select("-__v");
    if (!data) throw new AppError("No document found with that ID", 404);

    return res.status(200).json({
      message: "Document retrieved successfully",
      data,
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // execute query
    const data = await features.query;

    if (!data || data.length === 0) {
      throw new AppError("No document found", 404);
    }

    return res.status(200).json({
      status: "ok",
      message: "Documents retrieved successfully",
      data: {
        count: data.length,
        data,
      },
    });
  });
