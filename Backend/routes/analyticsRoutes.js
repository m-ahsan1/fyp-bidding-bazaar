// Monitoring router
const express = require("express");
const monitoringRouter = express.Router();
const os = require('os');

// Middleware to collect CPU and memory usage
monitoringRouter.get('/', async (req, res) => {
  try {
    req.stats = {
      activeUsers: '0', // Customize this to fetch active user count from your database
      cpuUsage: os.loadavg(),
      memoryUsage: {
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
      },
    };
    res.json(req.stats); // Return stats as JSON
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = monitoringRouter;