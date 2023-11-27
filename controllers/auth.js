const User = require("../models/user");
const catchASync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const {
  securePassword,
  comparePassword,
  generateToken,
} = require("../utils/auth");
const { registerSchema, loginSchema } = require("../utils/validation");

//      registering users
exports.register = catchASync(async (req, res, next) => {
  const { username, password, gender } = req.body;

  // validating inputs
  const { value, error } = await registerSchema.validate(req.body);
  if (error) {
    throw new AppError(error.details[0].message, 400);
  }

  // checking existing user
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    throw new AppError("User already exists", 401);
  }

  // hashing password
  const hashedPassword = await securePassword(password);

  //saving user to db
  const user = new User({ ...req.body, password: hashedPassword });

  await user.save();

  res
    .status(200)
    .json({ status: "ok", message: "User registered successfully", user });
});

//      user login
exports.login = catchASync(async (req, res, next) => {
  const { username, password } = req.body;

  // validating inputs
  const { error } = await loginSchema.validate(req.body);
  if (error) {
    throw new AppError(error.details[0].message, 4);
  }

  //check existing user
  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    throw new AppError("no user found", 404);
  }

  //comparing passwords
  const passwordMatch = await comparePassword(password, existingUser.password);

  if (!passwordMatch) {
    throw new AppError("username or password invalid", 401);
  }

  // generating token
  const token = generateToken({ _id: existingUser._id }, "1d");

  // destructure user info
  const { name, email, phone, displayImage, gender, address, created_at } =
    existingUser;

  return res.status(200).json({
    token,
    user: { name, email, phone, displayImage, address, gender, created_at },
  });
});
