const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

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
router.put("/deductToken/:uid", async (req, res) => {
  const { amount } = req.body;
  const uid = req.params.uid;

  try {
    const user = await User.findOne({ uid: uid });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Deduct tokens
    user.token -= amount; // Assuming token is a numeric field

    // Save updated user
    await user.save();

    res.status(200).json(user); // Respond with updated user data
  } catch (error) {
    console.error("Error updating user token:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
