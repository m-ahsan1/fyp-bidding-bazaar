const UserInteraction = require('../models/userInteractionsModel');

// get user recommendations
const getUserRecommendations = async (req, res) => {
    const { userId } = req.params;
    try {
        const userInteractions = await UserInteraction.find({ userId: userId });

        // Find all users who have interacted with the same listings
        const otherUsers = await UserInteraction.find({
            listingId: { $in: userInteractions.map(i => i.listingId) },
        });

        // Find all listings that these other users have interacted with
        const recommendations = await UserInteraction.find({
            userId: { $in: otherUsers.map(i => i.userId), $ne: userId }, // Exclude the current user
        });

        // Count the occurrences of each listing
        const listingCounts = {};
        recommendations.forEach(i => {
            listingCounts[i.listingId] = (listingCounts[i.listingId] || 0) + 1;
        });
        // Convert the listingCounts object to an array of objects
        const listingCountsArray = Object.keys(listingCounts).map(listingId => ({
            listingId,
            count: listingCounts[listingId],
        }));

        // Sort the array based on the count in descending order
        listingCountsArray.sort((a, b) => b.count - a.count);

        // Extract only the listing IDs in the sorted order
        const sortedListingIds = listingCountsArray.map(item => item.listingId);

        // only return the top 5 recommendations
        const top5Recommendations = sortedListingIds.slice(0, 5);

        res.status(200).send(top5Recommendations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getUserRecommendations,
}
