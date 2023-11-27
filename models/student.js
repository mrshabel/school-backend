const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  class: String,
  displayImage: String,
  dob: Date,
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  parent: {
    name: String,
    address: String,
    email: { type: String, unique: true },
    phone: String,
    occupation: String,
    gender: {
      type: String,
      enum: ["male", "female"],
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Student = mongoose.model("Student", studentSchema);
