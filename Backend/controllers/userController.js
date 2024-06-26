const User = require("../models/userModel");
const mongoose = require("mongoose");

// Get all users
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific user
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ uid: id });
    if (!user) {
      console.log(id);
      console.log(user);

      return res
        .status(404)
        .json({ message: `Cannot find user with this UID ${req.params.uid}` });
    }
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ message: `Cannot find user with this email ${email}` });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Create a new user
const createUser = async (req, res, next) => {
  const { username, email, uid, image, phone, cnic, currentAddress, token } =
    req.body;
  // if (!username || !email || !phone || !cnic || !currentAddress) {
  //     return res.status(400).json({ message: "Please provide all details" });
  // }
  const nuser = new User({
    username,
    email,
    image,
    phone,
    cnic,
    uid,
    currentAddress,
    token,
  });
  try {
    const newUser = await nuser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
};

// Update a user
const updateUser = async (req, res, next) => {
  const { username, email, image, phone, cnic, currentAddress, token, uid } =
    req.body;

  try {
    const user = await User.findOne({ uid: req.headers.uid }); // Find by 'uid' field
    if (!user) {
      return res.status(404).send(`No user with UID: ${uid}`);
    }
    // Update user properties
    user.username = username || user.username;
    user.email = email || user.email;
    user.image = image || user.image;
    user.phone = phone || user.phone;
    user.cnic = cnic || user.cnic;
    user.currentAddress = currentAddress || user.currentAddress;
    user.uid = uid || user.uid;
    // Save the updated user
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user's token
const updateUserToken = async (req, res, next) => {
  const { addTokenAmount } = req.body;
  const uid = req.headers.uid;

  try {
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).send(`No user found with UID: ${uid}`);
    }

    user.token = (user.token || 0) + addTokenAmount;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user
const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No user with id: ${id}`);
  }
  try {
    await User.findByIdAndRemove(id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const addListing = async (req, res, next) => {
//     const { id } = req.params;
//     const { listing } = req.body;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).send(`No user with id: ${id}`);
//     }
//     try {
//         const updateUser = await User.findByIdAndUpdate(id, { $push: { listings: listing } }, { new: true });
//         res.status(201).json(updateUser);
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }

// const removeListing = async (req, res, next) => {
//     const { id } = req.params;
//     const { listing } = req.body;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).send(`No user with id: ${id}`);
//     }
//     try {
//         const updateUser = await User.findByIdAndUpdate(id, { $pull: { listings: listing } }, { new: true });
//         res.status(201).json(updateUser);
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  updateUserToken,
};
