const express = require('express');
const router = express.Router();

const {
    getUserPDFanalytics,
    getUserPayanalytics,
    getUserClickanalytics,
    getUserCaranalytics,
} = require('../controllers/userAnalyticsController');

// get user pdf analytics
router.get('/pdf/:userId', getUserPDFanalytics);

// get user pay analytics
router.get('/pay/:userId', getUserPayanalytics);

// get user click analytics
router.get('/click/:userId', getUserClickanalytics);

// get user car analytics
router.get('cars/:userId', getUserCaranalytics);

module.exports = router;