const fs = require("fs");

module.exports = deleteImageOnError = async (err, req, res, next) => {
  if (err) {
    if (req.file?.path) {
      fs.unlink(req.file?.path, (error) => {
        if (error) next(new AppError("An error occurred", 500));
      });
    }
    next(err);
  }
  next();
};
