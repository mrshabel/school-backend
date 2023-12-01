const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: String,
  class: { type: mongoose.Types.ObjectId, ref: "Class" },
  subject: { type: mongoose.Types.ObjectId, ref: "Subject" },
  email: String,
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

teacherSchema.index({ name: 1, email: 1 }, { unique: true });

module.exports = Teacher = mongoose.model("Teacher", teacherSchema);
