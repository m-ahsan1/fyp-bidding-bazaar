const express = require("express");
const router = express.Router();
const Listing = require("../models/listingsModel");

// Get all listings
router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific listing by ID
router.get("/:id", getListing, (req, res) => {
  res.json(res.listing);
});

// Create a new listing
router.post("/", async (req, res) => {
  const listing = new Listing({
    image: req.body.image,
    title: req.body.title,
    price: req.body.price,
    engine: req.body.engine,
    mileage: req.body.mileage,
    modelYear: req.body.modelYear,
    description: req.body.description,
    company: req.body.company,
  });

  try {
    const newListing = await listing.save();
    res.status(201).json(newListing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a listing by ID
router.patch("/:id", getListing, async (req, res) => {
  if (req.body.image != null) {
    res.listing.image = req.body.image;
  }
  if (req.body.title != null) {
    res.listing.title = req.body.title;
  }
  if (req.body.price != null) {
    res.listing.price = req.body.price;
  }
  if (req.body.engine != null) {
    res.listing.engine = req.body.engine;
  }
  if (req.body.mileage != null) {
    res.listing.mileage = req.body.mileage;
  }
  if (req.body.modelYear != null) {
    res.listing.modelYear = req.body.modelYear;
  }
  if (req.body.description != null) {
    res.listing.description = req.body.description;
  }
  if (req.body.company != null) {
    res.listing.company = req.body.company;
  }

  try {
    const updatedListing = await res.listing.save();
    res.json(updatedListing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a listing by ID
router.delete("/:id", getListing, async (req, res) => {
  try {
    await res.listing.remove();
    res.json({ message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to get a specific listing by ID
async function getListing(req, res, next) {
  try {
    const listing = await Listing.findById(req.params.id);
    if (listing == null) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.listing = listing;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
