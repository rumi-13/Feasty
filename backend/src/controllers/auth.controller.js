require('dotenv').config();
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const foodPartnerModel = require('../models/foodpartner.model');


//Register User
async function registerUser(req, res) {
  const { fullName, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    email,
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  // create token and save in cookies
    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)
    res.cookie("token", token)

    res.status(201).json({
        message: "User registered succesfully",
        user:{
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
}


// Login User
async function loginUser(req,res){
  const {email, password} = req.body;

  const user = await userModel.findOne({email});

  if(!user){
    res.status(400).json({
      message: "Invalid Email or Password!"
    })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(!isPasswordValid){
     res.status(400).json({
      message: "Invalid Email or Password!"
    })
  }

  const token = jwt.sign({
    id: user._id,
  }, process.env.JWT_SECRET)

  res.cookie("token", token);

  res.status(200).json({
    message: "User Loggedin Successfully",
     user:{
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
  })
}

// Logout User
function logoutUser(req,res){
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully"
  });
}

// Register FoodPartner 
async function registerFoodPartner(req, res) {
  const{name, email, password} = req.body;

  const isFoodPartnerExisting = await foodPartnerModel.findOne({email});

  if(isFoodPartnerExisting){
    res.status(400).json({
      message: "FoodPartner Account already exists!"
    })
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const foodPartner = await foodPartnerModel.create({
    name, 
    email,
    password: hashedPassword,
  })

  // craete token
  const token = jwt.sign({
    id: foodPartner._id,
  }, process.env.JWT_SECRET)

  // send Cookie (token)
  res.cookie("token", token);

    // send response
  res.status(201).json({
    message: "FoodPartner Account Created Successfully!"
  })
}

// Login foodPartner
async function loginFoodPartner(req, res){
  const{email, password} = req.body;

  const user = await foodPartnerModel.findOne({email});

  if(!user){
    res.status(400).json({
     message: "Invalid Email or Password!"
    })
  }

  const isPasswordValid = await bcrypt.compare(password,user.password);

  if(!isPasswordValid){
    res.status(400).json({
         message: "Invalid Email or Password!"
    })
  }

    const token = jwt.sign({
      id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token);

    res.status(200).json({
      message: "FoodPartner Logged in Successfully!",
      user:{
        id: user._id,
        name: user.name,
        email: user.email,
      }
    })
}

// Logout FoodPartner
function logoutFoodPartner(req, res){
  res.clearCookie("token");
  res.status(200).json({
    message:"FoodPartner logged out successfully"
  })
}


// moduleExports
module.exports={
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner,
}