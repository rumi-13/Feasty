const mongoose = require('mongoose');

// Create Schema
const foodPandaSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }, 
    password:{
        type: String,
        required: true
    }

})

// Create Model
const foodPartnerModel = mongoose.model("foodPartner", foodPandaSchema);

module.exports = foodPartnerModel;