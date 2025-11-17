require("dotenv").config();
const mongoose = require("mongoose");
const dbURL = process.env.ATLASDB_URL;


function connectDB() {
  mongoose.connect(dbURL)
    .then(console.log("Successfully Connected to MongoDB"))
    .catch((err) => console.log("MongoDB connection error: " + err));
}

module.exports = connectDB;


