const AppError = require("../utils/appError");

const handleDuplicateFieldsDB = (error) => {
  const value = error.message.match(/(["'])(\\?.)*?\1/)[0];

  const message = `${value} already exists. Please try a different value`;
  return new AppError(message, 400);
};

const handleCastErrorDB = (error) => {
  const message = `${error.value} is not a valid ${error.path}`;
  return new AppError(message, 400);
};

//development error handling
const handleDevelopmentError = (error, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      stack: error.stack,
      error,
    });
  }
};

//production error handling
const handleProductionError = (error, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  }
};

module.exports = customError = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  error.message = error.message || "Something went wrong";

  if (process.env.NODE_ENV === "development") {
    handleDevelopmentError(error, req, res);
  } else if (process.env.NODE_ENV === "production") {
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    handleProductionError(error, req, res);
  }
};
