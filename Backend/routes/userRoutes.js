const express = require("express");
const router = express.Router();

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    addListing,
    removeListing,
    } = require("../controllers/userController");

// Get all users
router.get("/", getUsers);

// Get a specific user
router.get("/:id", getUser);

// Create a new user
router.post("/", createUser);

// Update a user
router.patch("/:id", updateUser);

// Delete a user
router.delete("/:id", deleteUser);

// Add listings
router.patch("/:id/addListing", addListing);

// Remove listings
router.patch("/:id/removeListing", removeListing);

module.exports = router;
