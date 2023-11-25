const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: String,
  class: String,
  displayImage: String,
  address: String,
  dob: Date,
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Teacher = mongoose.model("Teacher", teacherSchema);
