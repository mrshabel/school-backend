const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema({
  name: String,
  address: String,
  email: { type: String, unique: true },
  phone: String,
  occupation: String,
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Parent = mongoose.model("Parent", parentSchema);
