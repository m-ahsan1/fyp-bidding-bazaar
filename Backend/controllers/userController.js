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
}

// Get a specific user

const getUser = async (req, res, next) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).json({message:"Cannot find user"});
        const users = await User.findById(req.params.id);
        if (users == null) {
            return res.status(404).json({ message: "Cannot find user" });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Create a new user
const createUser = async (req, res, next) => {
    const { username, email, image, Phone, cnic, currentAddress } = req.body;
    if (!username || !email || !Phone || !cnic || !currentAddress) {
        return res.status(400).json({ message: "Please provide all details" });
    }
    const nuser = new User({
        username,
        email,
        image,
        Phone,
        cnic,
        currentAddress,
    });

    try {
        const newUser = await nuser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Update a user
const updateUser = async (req, res, next) => {
    const {id } = req.params;
    const { username, email, image, Phone, cnic, currentAddress } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No user with id: ${id}`);
    }
    res.user = { username, email, image, Phone, cnic, currentAddress};
    if (!username || !email || !Phone || !cnic || !currentAddress) {
        return res.status(400).json({ message: "Please provide proper details" });
    }
    try {
        const updateUser = await res.user.save();
        res.status(201).json(updateUser);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

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
}

const addListing = async (req, res, next) => {
    const { id } = req.params;
    const { listing } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No user with id: ${id}`);
    }
    try {
        const updateUser = await User.findByIdAndUpdate(id, { $push: { listings: listing } }, { new: true });
        res.status(201).json(updateUser);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const removeListing = async (req, res, next) => {
    const { id } = req.params;
    const { listing } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No user with id: ${id}`);
    }
    try {
        const updateUser = await User.findByIdAndUpdate(id, { $pull: { listings: listing } }, { new: true });
        res.status(201).json(updateUser);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    addListing,
    removeListing,
};