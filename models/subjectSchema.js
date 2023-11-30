const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: String,
  code: String,
  class: { type: mongoose.Types.ObjectId, ref: "Class" },
  teacher: { type: mongoose.Types.ObjectId, ref: "Teacher" },
});

module.exports = Subject = mongoose.model("Subject", subjectSchema);
