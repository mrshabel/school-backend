require("dotenv").config();
const mongoose = require("mongoose");

//handle exceptions (errors and bugs)
process.on("uncaughtException", (error) => {
  console.log("Uncaught Exception! Shutting down...");
  console.log(error.name, error.message);
  process.exit(1);
});

const app = require("./app");

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Successfully connected to database"));

const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`server running on port ${process.env.PORT}`);
});

//handle rejected promises
process.on("unhandledRejection", (error) => {
  console.log("Unhandled Rejection! Shutting down...");
  console.log(error.name, error.message);
  server.close(() => process.exit(1));
});
