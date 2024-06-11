const { color } = require("framer-motion");
const mongoose = require("mongoose");

// Define the listing schema
const listingSchema = new mongoose.Schema({
  images: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: String,
    required: true,
  },
  engine: {
    type: String,
    required: true,
  },
  mileage: {
    type: String,
    required: true,
  },
  modelYear: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  currentBid: {
    type: Number,
  },
  uid: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  regno: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isSold: {
    type: Boolean,
    default: false,
  }
});

// Create the Listing model
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
