const express = require("express");
const router = express.Router();
const axios = require("axios");

const Listing = require("../models/listingsModel");

// Get all listings
router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find({ isSold: false});
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
    images: req.body.images,
    title: req.body.title,
    price: req.body.price,
    engine: req.body.engine,
    mileage: req.body.mileage,
    modelYear: req.body.modelYear,
    description: req.body.description,
    company: req.body.company,
    currentBid: 0,
    uid: req.body.uid,
    color: req.body.color,
    transmission: req.body.transmission,
    city: req.body.city,
    regno: req.body.regno,
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
  if (req.body.images != null) {
    res.listing.images = req.body.images;
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
  if (req.body.currentBid != null) {
    res.listing.currentBid = req.body.currentBid;
  }
  if (req.body.color != null) {
    res.listing.color = req.body.color;
  }
  if (req.body.transmission != null) {
    res.listing.transmission = req.body.transmission;
  }
  if (req.body.city != null) {
    res.listing.city = req.body.city;
  }
  if (req.body.regno != null) {
    res.listing.regno = req.body.regno;
  }
  if (req.body.isSold != null) {
    res.listing.isSold = req.body.isSold;
  }
  try {
    const updatedListing = await res.listing.save();
    res.json(updatedListing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", getListing, async (req, res) => {
  if (req.body.images != null) {
    res.listing.images = req.body.images;
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
  if (req.body.currentBid != null) {
    res.listing.currentBid = req.body.currentBid;
  }
  if (req.body.color != null) {
    res.listing.color = req.body.color;
  }
  if (req.body.transmission != null) {
    res.listing.transmission = req.body.transmission;
  }
  if (req.body.city != null) {
    res.listing.city = req.body.city;
  }
  if (req.body.regno != null) {
    res.listing.regno = req.body.regno;
  }
  if (req.body.isSold != null) {
    res.listing.isSold = req.body.isSold;
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
    await res.listing.deleteOne();
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

router.post("/image_validation", async (req, res) => {
  try {
    const imageBase64 = req.body.image;
    const company = req.body.company;
    let title = req.body.title;

    const response = await axios({
      method: 'POST',
      url: 'https://detect.roboflow.com/car-model-aroud/1',
      params: {
        api_key: 'K4XyDbduTlXi7SaMZM3S'
      },
      data: imageBase64,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    if (response.data.predicted_classes.length === 0) {
      res.status(400).json({ success: false, message: 'No car detected in the image' });
      return;
    }
    predicted_classes = response.data.predicted_classes.map((item) => (item.split('_')));
    title = title.toLowerCase();
    for (let i = 0; i < predicted_classes.length; i++) {
      if (predicted_classes[i][0].toLowerCase() === company.toLowerCase()) {
        const titleParts = title.split(" ");
        for (let j = 1; j < predicted_classes[i].length; j++) {
          if (titleParts.includes(predicted_classes[i][j].toLowerCase())) {
            res.status(200).json({ success: true, message: 'Car detected in the image' });
            console.log('Car detected in the image');
            return;
          }
        }
      }
    }
    res.status(200).json({ success: false, message: 'Car in the image does not match the listing' });
    console.log('Car in the image does not match the listing');
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});

// get all listings by a specific user id
router.get("/user/:uid", async (req, res) => {
  try {
    const listings = await Listing.find({ uid: req.params.uid });
    console.log("1", listings);
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;