const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const {v4:uuid} = require('uuid')

// Create foodItem
async function createFoodItem(req,res){
  
    /*Upload File to imageKit */
     const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid())
     console.log(fileUploadResult);
     
     const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id,
     })

     res.status(201)
     .json({
        message: "food item created successfully",
        food: foodItem,
     })
}

// Get foodItem
async function getFoodItems(req,res){
   const foodItems = await foodModel.find()
   res.status(200).json({message: "Food Items fetched successfully!", foodItems: foodItems})
}

module.exports = {
    createFoodItem,
    getFoodItems,
}