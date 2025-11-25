const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
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
    }, "919dfd1a90780fdd191c35c69b18de16")
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

async function loginUser(req,res){
  const {email, password} = req.body;

  const user = await userModel.findOne({email})

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
  }, "919dfd1a90780fdd191c35c69b18de16")

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

module.exports={
    registerUser,
    loginUser,
}