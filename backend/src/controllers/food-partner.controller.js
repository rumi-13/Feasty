const foodPartnerModel = require('../models/foodpartner.model');
const foodModel = require('../models/food.model')

async function getFoodPartner(req, res){
   
    
    const {id} = req.params;

    

    const foodPartner = await foodPartnerModel.findById(id);

if (!foodPartner) {
  return res.status(404).json({ message: "Food Partner not found!" });
}

const foodItemsByFoodPartner = await foodModel.find({ foodPartner: id });

   
    
return res.status(200).json({
  message: "Food partner found successfully",
  foodPartner: {
    ...foodPartner.toObject(),
    foodItemsByFoodPartner,
  },
});

}

module.exports = {
    getFoodPartner,
}