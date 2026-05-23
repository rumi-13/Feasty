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
    contact:{
      type: String,
      required: false,
      default: null,
    },
    password:{
        type: String,
        required: false,
        default: null,
    },    
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    photoURL: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      required: true,
      default: null,
    },
    bio: {
      type: String,
      required: true,
      default: null,
    }

})

// Create Model
const foodPartnerModel = mongoose.model("foodPartner", foodPandaSchema);

module.exports = foodPartnerModel;