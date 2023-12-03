const multer = require("multer");
const AppError = require("../utils/appError");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img/teacher");
  },
  filename: (req, file, cb) => {
    const name = req.body.name.split(" ").join("");
    const ext = file.mimetype.split("/")[1];
    cb(null, `${name}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Only images are allowed", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadTeacherPhoto = upload.single("displayImage");
