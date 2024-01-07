// Import necessary modules and setup express router
const _ = require("lodash") 
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const { Admin} = require('../models/adminModel'); 

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

// POST route to create a new admin
router.post('/', async (req, res) => {
  // Validate the request body using Joi schema
  const { error } = validateAdmin(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    // Check if the email already exists
    let existingAdmin = await Admin.findOne({ email: req.body.email });
    if (existingAdmin) {
      return res.status(400).send('Email already exists');
    }

    // Create a new admin instance using the Admin model
    const newAdmin = new Admin(_.pick(req.body,["username","email","password"]));
    const salt = await bcrypt.genSalt(10);
    newAdmin.password = await bcrypt.hash(newAdmin.password,salt);
    // Save the new admin to the database
    await newAdmin.save();

    // Respond with the created admin object
    res.status(201).send(_.pick(newAdmin,["_id","username","email"]));
  } catch (err) {
    // Handle server errors
    console.error(err);
    res.status(500).send('Server error');
  }
});

function validate(req) {
  const schema = Joi.object({
    username: Joi.string().required().min(5).max(50),
    email: Joi.string().required().email().max(255),
    password: Joi.string().required().min(5).max(1024)
  });

  return schema.validate(admin);
}

module.exports = router;