const express = require('express');
const router = express.Router();

const { 
    postUserInteraction 
} = require('../controllers/userInteractionsController');

// post user interaction
router.post('/', postUserInteraction);

module.exports = router;