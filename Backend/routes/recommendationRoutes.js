const express = require('express');
const router = express.Router();

const {
    getUserRecommendations,
} = require('../controllers/userRecommendationController');

// get user recommendations
router.get('/:userId', getUserRecommendations);

module.exports = router;