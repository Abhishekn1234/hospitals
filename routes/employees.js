const express = require('express');
const router = express.Router();
const multer = require("multer");
const Employee = require("../models/Employee");

const mongoose = require("mongoose");

router.get('/api/employee', async (req, res) => {
  try {
    const head = await Employee.find();
    res.status(200).json(head);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }

});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

router.get('/api/employee/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json(employee);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/api/post_employee', upload.single('profileImage'), async (req, res) => {
  try {
    const { name, employeeNumber, age, profileDescription, department } = req.body;

    const employee = new Employee({
      name,
      employeeNumber,
      age,
      profileDescription,
      department,
      profileImage: req.file ? req.file.filename:null,
    });

    const savedEmployee = await employee.save();
    res.status(200).json({ savedEmployee });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Adding and posting details" });
  }
});


router.put('/api/update_employee/:id', upload.single('profileImage'), async (req, res) => {
  const { id } = req.params;
  const { name, employeeNumber, age, profileDescription, department } = req.body;
  const updatedEmployee = {
    name,
    employeeNumber,
    age,
    profileDescription,
    department,
  };

  if (req.file && req.file.filename) {
    updatedEmployee.profileImage = req.file.filename;
  }

  try {
    const updateemployee = await Employee.findByIdAndUpdate(id, updatedEmployee, { new: true });
    res.status(200).json({ success: "Updated successfully", employee: updateemployee });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }

});

router.delete('/api/delete_employee/:id', async (req, res) => {
  try {
    const response = await Employee.findByIdAndDelete(req.params.id);
    console.log(response);
    res.status(200).json({ success: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Cannot be deleted" });
  }
});

module.exports = router;
