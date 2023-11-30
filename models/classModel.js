const mongoose = require("mongoose");

const classSchema = mongoose.Schema({
  name: {
    type: String,
    enum: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  },
  dateFrom: Date,
  dateTo: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = ClassModel = mongoose.model("Class", classSchema);
