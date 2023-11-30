const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  class: { type: mongoose.Types.ObjectId, ref: "Class" },
  displayImage: String,
  dob: Date,
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  parent: {
    name: String,
    address: String,
    email: { type: String, unique: true, sparse: true },
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

//check for query execution time
// studentSchema.pre("save", function () {
//   this._startTime = Date.now();
// });

// studentSchema.post("save", function () {
//   if (this._startTime !== null) {
//     console.log("Runtime in MS: ", Date.now() - this._startTime);
//   }
// });

module.exports = Student = mongoose.model("Student", studentSchema);
