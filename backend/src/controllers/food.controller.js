const foodModel = require('../models/food.model');

// Create foodItem
async function createFoodItem(req,res){
   // console.log(req.foodPartner);
   
    
    res.json({message: "food item created"})
     console.log(req.body);
     console.log(req.file);
     
}


module.exports = {
    createFoodItem,
}