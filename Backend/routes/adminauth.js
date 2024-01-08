// Import necessary modules and setup express router
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const _ = require("lodash") 
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const { Admin} = require('../models/adminModel'); 
const auth = require('../middleware/auth');

// POST route to login admin
router.post('/', async (req, res) => {
  // Validate the request body using Joi schema
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    // Check if the email already exists
    let existingAdmin = await Admin.findOne({ email: req.body.email });
    if (!existingAdmin) {
      return res.status(400).send('Invalid email or password.');
    }

    const validPassword = await bcrypt.compare(req.body.password, existingAdmin.password);
    if (!validPassword) {
      return res.status(400).send('Invalid email or password.');
    }

    const token = existingAdmin.generateAuthToken();

    res.send(token);

  } catch (err) {
    // Handle server errors
    console.error(err);
    res.status(500).send('Server error');
  }
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().required().email().max(255),
    password: Joi.string().required().min(5).max(1024)
  });

  return schema.validate(req);
}


module.exports = router;
