const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  phone: String,
  displayImage: { type: String, default: "" },
  address: String,
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = User = mongoose.model("User", userSchema);
