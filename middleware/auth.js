const jwt = require("jsonwebtoken");
const appError = require("../utils/appError");
const { JWT_SECRET } = process.env;

exports.restrictsTo = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  const currentTime = Date.now() / 1000;

  try {
    if (!token) {
      throw new appError("A token is required for authentication", 404);
    }

    // verifying token
    const decoded = await jwt.verify(token, JWT_SECRET);

    if (decoded && decoded.exp && decoded.exp < currentTime) {
      throw new appError("Token has expired. Please login again", 401);
    }

    req.user = decoded;

    next();
  } catch (error) {
    return next(error);
  }
};
