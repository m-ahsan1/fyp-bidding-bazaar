const express = require("express");
const router = express.Router();

const {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    // addListing,
    // removeListing,
    } = require("../controllers/userController");

// Get all users

// Get a specific user
router.get("/:id", getUser);

// Create a new user
router.post("/", createUser);

// Update a user
router.put("/", updateUser);

// Delete a user
router.delete("/:id", deleteUser);

// Add listings
// router.patch("/:id/addListing", addListing);

// // Remove listings
// router.patch("/:id/removeListing", removeListing);

module.exports = router;
