const UserInteraction = require('../models/userInteractionsModel');

// post user interaction
const postUserInteraction = async (req, res) => {
    const { userId, listingId } = req.body;
    const newUserInteraction = new UserInteraction({
        userId,
        listingId,
    });
    try {
        await newUserInteraction.save();
        res.status(201).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    postUserInteraction,
}
