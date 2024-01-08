// Import necessary modules and setup express router
const jwt = require('jsonwebtoken');
const _ = require("lodash") 
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const { Admin, validateAdmin } = require('../models/adminModel'); 

// GET route to fetch all admins
router.get('/', async (req, res) => {
  try {
    // Fetch all admins from the database
    const admins = await Admin.find();
    
    // Respond with the retrieved admins
    res.json(admins);
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  // Validate the request body using Joi schema
  const { error } = validateAdmin(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    // Check if the email already exists
    const existingAdmin = await Admin.findOne({ email: req.body.email });
    if (existingAdmin) {
      return res.status(400).send('Email already exists');
    }

    // Create a new admin instance using the Admin model
    const newAdmin = new Admin(_.pick(req.body, ["username", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    newAdmin.password = await bcrypt.hash(newAdmin.password, salt);
    // Save the new admin to the database
    await newAdmin.save();

    const privateKey = process.env.JWT_PRIVATE_KEY;

    // Use the privateKey variable to sign your token
    const token = jwt.sign({ _id: newAdmin._id }, privateKey);

    // Respond with the created admin object
    res.header('x-auth-token', token).status(201).send(_.pick(newAdmin, ["_id", "username", "email"]));
  } catch (err) {
    // Handle server errors
    console.error(err);
    res.status(500).send('Server error');
  }
});


module.exports = router;
