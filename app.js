const express = require("express");
const cors = require("cors");
const customError = require("./middleware/customError");
const auth = require("./routes/authRoutes");
const user = require("./routes/userRoutes");
const student = require("./routes/studentRoutes");
const teacher = require("./routes/teacherRoutes");
const result = require("./routes/resultRoutes");
const subject = require("./routes/subjectRoutes");
const studentClass = require("./routes/classRoutes");

const app = express();
app.use(express.json(), cors(), express.urlencoded({ extended: true }));
//  routes here
app.use("/api", auth, user);
app.use("/api/students", student);
app.use("/api/teachers", teacher);
app.use("/api/classes", studentClass);
app.use("/api/results", result);
app.use("/api/subjects", subject);

//global error handler
app.use(customError);

module.exports = app;
