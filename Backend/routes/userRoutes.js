const express = require("express");
const router = express.Router();

const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  updateUserToken,
} = require("../controllers/userController");

// Get a user by email
router.get("/email/:email", getUserByEmail);

// Get a specific user
router.get("/:id", getUser);

// Create a new user
router.post("/", createUser);

// Update a user
router.put("/", updateUser);

// Delete a user
router.delete("/:id", deleteUser);

router.put("/updateToken", updateUserToken);

module.exports = router;
