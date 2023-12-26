const mongoose = require('mongoose');

const UserInteractionSchema = new mongoose.Schema({
  userId: String,
  listingId: String,
  interactionType: String,
});

module.exports = mongoose.model('UserInteraction', UserInteractionSchema);