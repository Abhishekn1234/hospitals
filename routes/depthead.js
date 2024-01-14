const express = require('express');
const router = express.Router();
const DepartmentHead = require('../models/DepartmentHead');
const multer = require('multer');
const mongoose = require('mongoose');
router.get('/api/department_heads',async(req,res)=>{
  try{
    const head = await DepartmentHead.find();
    res.status(200).json(head);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
  
  });

router.get('/api/department_heads/:id', async (req, res) => {
  try {
    const { id } = req.params;

    
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const head = await DepartmentHead.findById(id);

    if (!head) {
       
      return res.status(404).json({ error: 'Department head not found' });
    }

    res.status(200).json(head);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
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

router.post('/api/add_department_head', upload.single('profileImage'), (req, res, next) => {
  console.log(req.file);
  next();
}, async (req, res) => {
  try {
    const newHead = new DepartmentHead({
      name: req.body.name,
      employeeNumber: req.body.employeeNumber,
      age: req.body.age,
      profileDescription: req.body.profileDescription,
      department: req.body.department,
      profileImage: req.file.filename, // Use req.file.filename instead of req.body.profileImage
    });

    const savedHead = await newHead.save();
    res.status(200).json({ head: savedHead, message: 'Added successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to add head', details: err.message });
  }
});


router.delete('/api/delete_department_head/:id', async (req, res) => {
  try {
    const head = await DepartmentHead.findByIdAndDelete(req.params.id);
    if (!head) {
      return res.status(404).json({ error: 'Head not found' });
    }
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});



router.put('/api/update_department_head/:id', upload.single('profileImage'), async (req, res) => {
  const { id } = req.params; 
  const { name, employeeNumber, age, profileDescription, department, profileImage } = req.body;

  const updatedHead = {
    name,
    employeeNumber,
    age,
    profileDescription,
    department,
    profileImage,
  };

  if (req.file) {
    
    updatedHead.profileImage = req.file.filename;
  }

  try {
    const updatedHeadResult = await DepartmentHead.findByIdAndUpdate(id, updatedHead, { new: true });

    res.json(updatedHeadResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

module.exports=router;