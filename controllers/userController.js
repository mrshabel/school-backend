const AppError = require("../utils/appError");
const User = require("../models/userModel");

exports.getUser = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return res.status(200).json({
      status: "ok",
      message: "User details retrieved",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
