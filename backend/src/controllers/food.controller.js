const foodModel = require("../models/food.model");
const likeModel = require("../models/like.model");
const saveModel = require("../models/save.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");
const mongoose = require("mongoose");

// Create foodItem
async function createFoodItem(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No video file provided" });
    }

    /*Upload File to imageKit */
    const fileUploadResult = await storageService.uploadFile(
      req.file.buffer,
      uuid()
    );

    const foodItem = await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      video: fileUploadResult.url,
      foodPartner: req.foodPartner._id,
    });

    res.status(201).json({
      message: "food item created successfully",
      food: foodItem,
    });
  } catch (error) {
    console.error("Error in createFoodItem:", error);
    res.status(500).json({
      message: "Failed to create food item",
      error: error.message,
    });
  }
}

// Get foodItem
async function getFoodItems(req, res) {
  const rawFoodItems = await foodModel.find();
  
  const foodItems = rawFoodItems.map(item => ({
    ...item._doc,
    video: storageService.getOptimizedVideoUrl(item.video)
  }));

  res.status(200).json({
    message: "Food Items fetched successfully!",
    foodItems: foodItems,
  });
}

// GetSaved Reels
async function getSavedReels(req, res) {
  try {
    let { id } = req.params;
    id = new mongoose.Types.ObjectId(id);

    const savedReels = await saveModel
      .find({ user: id })
      .populate("food");

    const cleanSavedReels = savedReels
      .filter(item => item.food)
      .map(item => ({
        ...item._doc,
        food: {
          ...item.food._doc,
          video: storageService.getOptimizedVideoUrl(item.food.video)
        }
      }));

    return res.status(200).json({
      message: "Saved posts fetched successfully!",
      saved: cleanSavedReels,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server error",
    });
  }
}


// Like Item
async function likeFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadyLiked = await likeModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isAlreadyLiked) {
    await likeModel.deleteOne({
      user: user._id,
      food: foodId,
    });

    await foodModel.findOneAndUpdate(
      { _id: foodId },
      { $inc: { likesCount: -1 } },
      { new: true }
    );

    return res.status(200).json({
      message: "Food unliked Successfully",
    });
  }

  const like = await likeModel.create({
    user: user._id,
    food: foodId,
  });

  await foodModel.findOneAndUpdate(
    { _id: foodId },
    { $inc: { likesCount: +1 } },
    { new: true }
  );

  return res.status(201).json({
    message: "Food liked successfully",
    like,
  });
}

// Save Food
async function saveFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadySaved = await saveModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isAlreadySaved) {
    await saveModel.deleteOne({
      user: user._id,
      food: foodId,
    });

    return res.status(200).json({
      message: "Food unsaved Successfully",
    });
  }

  const like = await saveModel.create({
    user: user._id,
    food: foodId,
  });

  res.status(201).json({
    message: "Food saved successfully",
    like,
  });
}

// Get User Interactions (liked and saved foods)
async function getUserInteractions(req, res) {
  try {
    const user = req.user;

    // Get all liked food IDs for the user
    const likedFoods = await likeModel
      .find({ user: user._id })
      .select("food");
    
    // Get all saved food IDs for the user
    const savedFoods = await saveModel
      .find({ user: user._id })
      .select("food");

    const likedIds = likedFoods.map(item => item.food.toString());
    const savedIds = savedFoods.map(item => item.food.toString());

    return res.status(200).json({
      message: "User interactions fetched successfully",
      likes: likedIds,
      saves: savedIds,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server error",
    });
  }
}

module.exports = {
  createFoodItem,
  getFoodItems,
  likeFood,
  saveFood,
  getSavedReels,
  getUserInteractions,
  // Delete food item (only owner partner)
  deleteFoodItem: async (req, res) => {
    try {
      const { id } = req.params;
      const partner = req.foodPartner; // set by authFoodPartnerMiddleware
      if (!id) return res.status(400).json({ message: 'Food id required' });

      const food = await foodModel.findById(id);
      if (!food) return res.status(404).json({ message: 'Food not found' });

      if (!partner || food.foodPartner.toString() !== partner._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to delete this item' });
      }

      // remove likes and saves associated with this food
      try {
        await likeModel.deleteMany({ food: id });
        await saveModel.deleteMany({ food: id });
      } catch (e) {
        console.error('Error removing related likes/saves:', e);
      }

      await foodModel.findByIdAndDelete(id);

      return res.status(200).json({ message: 'Food item deleted' });
    } catch (err) {
      console.error('deleteFoodItem error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  },
};
