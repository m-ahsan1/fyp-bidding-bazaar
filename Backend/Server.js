const express = require("express");
const mongoose = require("mongoose");
const blogsRoutes = require("./routes/blogsRoutes");
const listingsRoutes = require("./routes/listingsRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const userRoutes = require("./routes/userRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const contactus = require("./routes/contactRoutes");
const userInteractionsRoutes = require("./routes/userInteractionsRoutes");
const userRecommendationRoutes = require("./routes/recommendationRoutes");
const userAnalyticsRoutes = require("./routes/userAnalyticsRoutes");
const admin = require("./routes/admin")

const cors = require("cors");
require("dotenv").config();
const strip = require("stripe")(process.env.SECRET_KEY);
// Create an Express app

const app = express();


//stripe
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json({ limit: "50mb" })); // Set a limit for JSON payload size
app.use(express.urlencoded({ extended: true, limit: "50mb" })); // Set a limit for URL-encoded payload size

app.use((req, res, next) => {
  console.log(req.path, res.method);
  next();
});

app.use;
// Aik he database use karni, no need to create multiple instead create collections in it
mongoose
  .connect("mongodb://127.0.0.1:27017/bidding-bazaar")
  .then(() => console.log("Database Connected!"))
  .catch((error) => {
    // Handle errors
    console.error("Error:", error);
  });

// create routes in the routes folder, import and add here
app.use("/api/blogs", blogsRoutes);
app.use("/api/listings", listingsRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/user", userRoutes);
// app.use("/api/notification", notificationRoutes);
app.use("/api/contactus", contactus);
app.use("/api/userInteractions", userInteractionsRoutes);
app.use("/api/userRecommendations", userRecommendationRoutes);
app.use("/api/userAnalytics", userAnalyticsRoutes);
app.use("/api/admin", admin);

//strip
app.post("/api/payment", async (req, res) => {
  let status, error;
  const { token, amount } = req.body;
  console.log(token);
});

// Define the port to listen on
const PORT = process.env.PORT || 3001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
