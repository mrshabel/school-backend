const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: String,
  teachers: [
    {
      teacher_id: { type: mongoose.Types.ObjectId, ref: "Teacher" },
      class_id: { type: mongoose.Types.ObjectId, ref: "Class" },
      days: [{ type: String }],
    },
  ],
});

module.exports = Subject = mongoose.model("Subject", subjectSchema);
