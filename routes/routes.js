const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/User");
const Submission = require('../models/Contactsubmission');

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
       
        const user = await User.findOne({ email });
        
        if (user && await bcrypt.compare(password, user.password)) {
            console.log(user);
            res.status(201).json({ res: 'Login success' });
        } else {
            res.status(401).json({ error: 'Invalid login' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            res.status(409).json({ error: 'User with the same email or username already exists' });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10); 
            
            const newUser = new User({ username, email, password: hashedPassword });
            await newUser.save();
            console.log(newUser);
            res.status(201).json({ res: 'Registered successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.delete('/login/:id', async (req, res) => {
    try {
        const result = await User.findByIdAndDelete(req.params.id);

        if (result === null) {
            
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.json({ success: true, result });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/submit-form', async (req, res) => {
    try {
        const { Name, email, mobileNumber, Address, message } = req.body;

        const newSubmission = new Submission({
        Name,
        email,
        Address,
        mobileNumber,
        message,
    });

       await newSubmission.save();

        res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
