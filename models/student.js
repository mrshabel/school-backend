const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  class: String,
  displayImage: String,
  address: String,
  dob: Date,
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  parent: {
    type: mongoose.Types.ObjectId,
    ref: "Parent",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Student = mongoose.model("Student", studentSchema);
