const mongoose = require('mongoose');

//Create Schema
const foodSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    video:{
        type: String,   // we will store URL of videoFile in database (video in cloud)
        required: true,
    },
    description:{
        type: String,
    },
    foodPartner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodPartner"
    }
})

// Create Model
const foodModel = mongoose.model("food", foodSchema);

// Exports
module.exports = foodModel;