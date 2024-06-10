// Import necessary modules and setup express router
const jwt = require('jsonwebtoken');
const _ = require("lodash") 
const bcrypt = require("bcrypt");
const express = require("express");
const auth = require('../middleware/auth');
const router = express.Router();
const { Admin, validateAdmin } = require('../models/adminModel'); 


router.post('/', auth, async (req, res) => {

  try {
    // Validate the request body using Joi schema
    const { error } = validateAdmin(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if the email already exists
    const existingAdmin = await Admin.findOne({ email: req.body.email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create a new admin instance using the Admin model
    const newAdmin = new Admin(_.pick(req.body, ["username", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    newAdmin.password = await bcrypt.hash(newAdmin.password, salt);
    // Save the new admin to the database
    await newAdmin.save();

    const token = newAdmin.generateAuthToken();
    // Respond with the created admin object and token
    res.header('x-auth-token', token).status(201).json(_.pick(newAdmin, ["_id", "username", "email"]));
    } catch (err) {
    // Handle server errors
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
