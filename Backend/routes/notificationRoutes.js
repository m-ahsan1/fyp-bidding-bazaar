// routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const Notification = require('../models/notificationModel');


router.post('/', async (req, res) => {
   
  const  {userId}  = req.body;
    
  try {
    if (!userId || userId === '') {
        return res.status(400).json({ error: 'User ID is required' });
      }

    const message = 'Your car has been posted!'; // Define your notification message here

    const newNotification = new Notification({ userId, message });
    await newNotification.save();

    res.status(201).json({ message: 'Notification sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending notification' });
  }
});

module.exports = router;
