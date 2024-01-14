const mongoose = require('mongoose');

const departmentHeadSchema = new mongoose.Schema({
  name: String,
  employeeNumber: String,
  age: Number,
  profileImage: String,
  profileDescription: String,
  department: String,
});

const DepartmentHead = mongoose.model('DepartmentHead', departmentHeadSchema);

module.exports = DepartmentHead;
