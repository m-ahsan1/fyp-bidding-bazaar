const express = require("express");
const monitoringRouter = express.Router();
const os = require('os');

// Middleware to collect CPU and memory usage
monitoringRouter.get('/', async (req, res) => {
  try {
    const cpuUsage = os.loadavg();
    const hasValidCPULoad = cpuUsage && cpuUsage.length > 0;

    req.stats = {
      activeUsers: '1', // Customize this to fetch active user count from your database
      cpuUsage: hasValidCPULoad ? cpuUsage : [], // Ensure a valid CPU load data array
      memoryUsage: {
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
      },
    };
    res.json(req.stats); // Return stats as JSON
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Failed to retrieve monitoring data' });
  }
});

module.exports = monitoringRouter;
