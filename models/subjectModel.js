const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: String,
  code: String,
  class: { type: mongoose.Types.ObjectId, ref: "Class" },
});

subjectSchema.index({ name: 1, class: 1 }, { unique: true });

module.exports = Subject = mongoose.model("Subject", subjectSchema);
