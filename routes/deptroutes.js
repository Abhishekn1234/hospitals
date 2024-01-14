
const express = require("express");
const multer = require("multer");
const path = require('path'); 
const Department = require("../models/Department");
const router = express.Router();
const mongoose=require("mongoose");
router.get('/api/departments', async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching departments' });
  }
});

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
router.post('/api/departments', upload.single('image'), (req, res, next) => {
  console.log(req.file); 
  next();
}, async (req, res) => {
  try {
    const { date, name, description } = req.body;
    
    

    const newDepartment = new Department({ date, name, description, image:req.file.filename});

    const savedDepartment = await newDepartment.save();
    res.json(savedDepartment);
  } catch (error) {
    console.error('Error creating department:', error);
    res.status(500).json({ error: 'Error creating department' });
  }
});
router.get('/api/departments/:id', async (req, res) => {
  try {
    const { id } = req.params;

    
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const head = await Department.findById(id);

    if (!head) {
       
      return res.status(404).json({ error: 'Department head not found' });
    }

    res.status(200).json(head);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.put('/api/departments/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { date, name, description,image } = req.body;
  const updateData = { date, name, description,image };

  if (req.file) {
    updateData.image = req.file.filename;
  }

  try {
    const updatedDepartment = await Department.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedDepartment) {
      // Handle the case where the department with the given ID was not found
      return res.status(404).json({ error: 'Department not found' });
    }

    res.json(updatedDepartment);
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({ error: 'Error updating department' });
  }
});


router.delete('/api/departments/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Department.findByIdAndDelete(id);
    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting department' });
  }
});

module.exports = router;
