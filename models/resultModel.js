const mongoose = require("mongoose");

const resultSchema = mongoose.Schema({
  type: {
    type: String,
    default: "exam",
    enum: ["exam", "test", "homework"],
  },
  subject: {
    type: mongoose.Types.ObjectId,
    ref: "Subject",
  },
  score: { type: Number, default: 0 },
});

module.exports = Report = mongoose.model("Result", resultSchema);
