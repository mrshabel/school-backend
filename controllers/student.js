const Student = require("../models/student");
const { studentSchema, updateStudentSchema } = require("../utils/validation");
const factory = require("./handlerFactory");

exports.createStudent = factory.create(Student, studentSchema);
exports.getStudent = factory.getOne(Student);
exports.deleteStudent = factory.delete(Student);
exports.updateStudent = factory.update(Student, updateStudentSchema);
exports.getAllStudents = factory.getAll(Student);
