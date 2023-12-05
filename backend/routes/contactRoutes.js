const express = require("express");
const router = express.Router();
const Contact = require("../models/contactModel")

router.post("/", async (req, res) => {
    const newContact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });
  
    try {
        const newcontactus = await newContact.save();
        res.status(201).json(newcontactus);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
  });

  module.exports = router;