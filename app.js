const express = require("express");
const cors = require("cors");
const customError = require("./middleware/customError");
const auth = require("./routes/authRoutes");
const user = require("./routes/userRoutes");
const student = require("./routes/studentRoutes");

const app = express();
app.use(express.json(), cors(), express.urlencoded({ extended: true }));
//  routes here
app.use("/api", auth);
app.use("/api", user);
app.use("/api/students", student);

//global error handler
app.use(customError);

module.exports = app;
