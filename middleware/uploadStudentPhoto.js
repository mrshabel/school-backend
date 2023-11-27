const multer = require("multer");
const AppError = require("../utils/appError");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img/student");
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
    cb(new AppError("Only images are accepted", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadStudentPhoto = upload.single("displayImage");
