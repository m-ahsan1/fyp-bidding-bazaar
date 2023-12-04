const mongoose = require("mongoose");

// Define the listing schema
const listingSchema = new mongoose.Schema({
  image: {
    type: String,
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
});

// Create the Listing model
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
