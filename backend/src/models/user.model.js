const mongoose = require("mongoose");

// Create Schema
const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    photoURL: {
      type: String,
      default: null,
    }
  },
    {
        timestamps:true
    }
);

// Create Model
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
