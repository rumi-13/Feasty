const mongoose = require('mongoose');


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

const foodPartnerModel = mongoose.model("foodPartnerModel", foodPandaSchema);

module.exports = foodPartnerModel;