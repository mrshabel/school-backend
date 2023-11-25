const multer = require("multer");
const path = require("path");
const appError = require("../utils/appError");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/images/students");
  },
  filename: (req, file, cb) => {
    //name-class-currentTime.ext
    let { name, class: studentClass } = req.body;
    name = name.split(" ").join("");
    studentClass = studentClass.split(" ").join("");
    const ext = file.mimetype.split("/")[1];
    cb(null, `${name}-${studentClass}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new appError("Only images are accepted", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadStudentPhoto = upload.single("displayImage");
