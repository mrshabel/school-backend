const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URL);
    console.log(
      "Successfully connected to database",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log(error);
  }
};
