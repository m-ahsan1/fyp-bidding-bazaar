const express = require("express");
const router = express.Router();
const Blog = require("../models/blogsModel");
const auth = require('../middleware/auth');

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
    // res.json("Hello");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific blog
router.get("/:id", getBlog, (req, res) => {
  res.json(res.blog);
});

// Create a new blog
router.post("/",auth, async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    body: req.body.body,
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a blog
router.patch("/:id", getBlog, async (req, res) => {
  if (req.body.title != null) {
    res.blog.title = req.body.title;
  }

  if (req.body.body != null) {
    res.blog.body = req.body.body;
  }

  try {
    const updatedBlog = await res.blog.save();
    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a blog
router.delete("/:id", getBlog, async (req, res) => {
  try {
    await res.blog.remove();
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to get a specific blog by ID
async function getBlog(req, res, next) {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog == null) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.blog = blog;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
