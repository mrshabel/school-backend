require("dotenv").config({ path: "../../.env" });
const mongoose = require("mongoose");
const Teacher = require("../../models/teacherModel");
const fs = require("fs");
const studentModel = require("../../models/studentModel");

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Successfully connected to database"));
const data = JSON.parse(fs.readFileSync(`${__dirname}/data.json`));
const { teachers } = data;

console.log(process.env.DB_URL);
async function importData() {
  try {
    await Teacher.create(teachers);
    console.log("Data successfully seeded");
    process.exit();
  } catch (error) {
    console.log(error);
  }
}

async function deleteData() {
  try {
    await studentModel.deleteMany();
    console.log("data successfully deleted");
    process.exit();
  } catch (error) {
    console.log(error);
  }
}

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
