const Teacher = require("../../models/teacher");
const fs = require("fs");
require("../../utils/db").dbConnect();

const data = JSON.parse(fs.readFileSync(`${__dirname}/data.json`));
const { teachers } = data;

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
    await Teacher.deleteMany();
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
