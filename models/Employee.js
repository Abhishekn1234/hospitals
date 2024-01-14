const mongoose=require("mongoose");

const employeeSchema=new mongoose.Schema({
    name: String,
    employeeNumber: String,
    age: Number,
    profileImage: String,
    profileDescription: String,
    department: String,
})
const Employee=mongoose.model('Employees',employeeSchema);
module.exports=Employee;