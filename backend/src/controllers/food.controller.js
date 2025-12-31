const foodModel = require("../models/food.model");
const likeModel = require("../models/like.model");
const saveModel = require("../models/save.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");
const mongoose = require("mongoose");

// Create foodItem
async function createFoodItem(req, res) {
  /*Upload File to imageKit */
  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    uuid()
  );
  console.log(fileUploadResult);

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
}

// Get foodItem
async function getFoodItems(req, res) {
  const foodItems = await foodModel.find();

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

    const cleanSavedReels = savedReels.filter(item => item.food);

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

  console.log(isAlreadyLiked);

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
module.exports = {
  createFoodItem,
  getFoodItems,
  likeFood,
  saveFood,
  getSavedReels,
};
