const express = require('express');
const router = express.Router();

const {
    getUserPDFanalytics,
    getUserPayanalytics,
    getUserClickanalytics,
} = require('../controllers/userAnalyticsController');

// get user pdf analytics
router.get('/pdf/:userId', getUserPDFanalytics);

// get user pay analytics
router.get('/pay/:userId', getUserPayanalytics);

// get user click analytics
router.get('/click/:userId', getUserClickanalytics);

module.exports = router;