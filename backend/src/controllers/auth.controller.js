require('dotenv').config();
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const foodPartnerModel = require('../models/foodpartner.model');

// Common cookie options for production (SameSite=None, Secure=true)
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
};


//Register User
async function registerUser(req, res) {

  const { fullName, email,password } = req.body;
  
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
    res.cookie("token", token, cookieOptions)

   return res.status(201).json({
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
   return res.status(400).json({
      message: "Invalid Email or Password!"
    })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(!isPasswordValid){
    return res.status(400).json({
      message: "Invalid Email or Password!"
    })
  }

  const token = jwt.sign({
    id: user._id,
  }, process.env.JWT_SECRET)

  res.cookie("token", token, cookieOptions);

 return res.status(200).json({
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
  res.clearCookie("token", cookieOptions);
  res.status(200).json({
    message: "User logged out successfully"
  });
}

// Register FoodPartner 
async function registerFoodPartner(req, res) {
  const{name, email, contact, password} = req.body;
  
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
    contact,
    password: hashedPassword,
  })

  // craete token
  const token = jwt.sign({
    id: foodPartner._id,
  }, process.env.JWT_SECRET)

  // send Cookie (token)
  res.cookie("token", token, cookieOptions);

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
   return res.status(400).json({
     message: "Invalid Email or Password!"
    })
  }

  const isPasswordValid = await bcrypt.compare(password,user.password);

  if(!isPasswordValid){
    return res.status(400).json({
         message: "Invalid Email or Password!"
    })
  }

    const token = jwt.sign({
      id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token, cookieOptions);

   return res.status(200).json({
      message: "FoodPartner Logged in Successfully!",
      user:{
        id: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
      }
    })
}

// Logout FoodPartner
function logoutFoodPartner(req, res){
  res.clearCookie("token", cookieOptions);
  res.status(200).json({
    message:"FoodPartner logged out successfully"
  })
}

// Verify Google Token and Create/Login User
const verifyGoogleToken = async (req, res) => {
  try {
    const { token, userType } = req.body;

    if (!token || !userType) {
      return res.status(400).json({ message: 'Token and userType are required' });
    }

    const firebaseAuth = require('../config/firebase');
    const decodedToken = await firebaseAuth.verifyIdToken(token);
    const { email, name, picture, uid } = decodedToken;

    // If user type is 'user'
    if (userType === 'user') {
      const User = require('../models/user.model');
      let user = await User.findOne({ email });
      
      // NEW USER - return signup data
      if (!user) {
        return res.status(200).json({
          message: 'New user detected',
          status: 'new_user',
          googleData: {
            email,
            fullName: name,
            photoURL: picture,
            googleId: uid,
          },
          userType: 'user'
        });
      }

      // EXISTING USER - log them in
      const jwtToken = jwt.sign(
        { id: user._id, email: user.email, userType: 'user' },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Use shared cookieOptions so SameSite is None in production and cookie is sent cross-site
      res.cookie('token', jwtToken, cookieOptions);

      return res.status(200).json({
        message: 'User logged in successfully',
        status: 'existing_user',
        user: { id: user._id, email: user.email, fullName: user.fullName, photoURL: user.photoURL || null },
      });
    }

    // If user type is 'foodpartner'
    if (userType === 'foodpartner') {
      const FoodPartner = require('../models/foodpartner.model');
      let foodpartner = await FoodPartner.findOne({ email });
      
      // NEW FOODPARTNER - return signup data
      if (!foodpartner) {
        return res.status(200).json({
          message: 'New food partner detected',
          status: 'new_user',
          googleData: {
            email,
            name,
            photoURL: picture,
            googleId: uid,
          },
          userType: 'foodpartner'
        });
      }

      // EXISTING FOODPARTNER - log them in
      const jwtToken = jwt.sign(
        { id: foodpartner._id, email: foodpartner.email, userType: 'foodpartner' },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Use shared cookieOptions so SameSite is None in production and cookie is sent cross-site
      res.cookie('token', jwtToken, cookieOptions);

      return res.status(200).json({
        message: 'FoodPartner logged in successfully',
        status: 'existing_user',
        foodpartner: { id: foodpartner._id, email: foodpartner.email, name: foodpartner.name, photoURL: foodpartner.photoURL || null },
      });
    }

  } catch (error) {
    console.error('Google token verification error:', error);
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};





// Register User with Google
const registerUserWithGoogle = async (req, res) => {
  try {
    const { fullName, email, googleId, photoURL } = req.body;

    // Check if user already exists
    let user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user with Google data
    user = new userModel({
      fullName,
      email,
      googleId,
      photoURL,
      // No password for Google auth
    });

    await user.save();

    // Create JWT token
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email, userType: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Send JWT in HTTP-only cookie (use shared cookieOptions)
    res.cookie('token', jwtToken, cookieOptions);

    return res.status(201).json({
      message: 'User created successfully',
      user: { id: user._id, email: user.email, fullName: user.fullName, photoURL: user.photoURL || null },
    });
  } catch (error) {
    console.error('Error registering user with Google:', error);
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
};

// Register FoodPartner with Google
const registerFoodPartnerWithGoogle = async (req, res) => {
  try {
    const { name, email, contact, address, bio, googleId, photoURL } = req.body;

    // Check if foodpartner already exists
    let foodpartner = await foodPartnerModel.findOne({ email });

    if (foodpartner) {
      return res.status(400).json({ message: 'FoodPartner already exists' });
    }

    // Create new foodpartner with Google data
    foodpartner = new foodPartnerModel({
      name,
      email,
      contact,
      address,
      bio,
      googleId,
      photoURL,
      // No password for Google auth
    });

    await foodpartner.save();

    // Create JWT token
    const jwtToken = jwt.sign(
      { id: foodpartner._id, email: foodpartner.email, userType: 'foodpartner' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Send JWT in HTTP-only cookie (use shared cookieOptions)
    res.cookie('token', jwtToken, cookieOptions);

    return res.status(201).json({
      message: 'FoodPartner created successfully',
      foodpartner: { id: foodpartner._id, email: foodpartner.email, name: foodpartner.name, photoURL: foodpartner.photoURL || null },
    });
  } catch (error) {
    console.error('Error registering foodpartner with Google:', error);
    res.status(400).json({ message: 'Error creating foodpartner', error: error.message });
  }
};

// moduleExports
module.exports={
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner,
    verifyGoogleToken,
    registerUserWithGoogle,
    registerFoodPartnerWithGoogle,
    // Fetch user by ID (public endpoint for profile viewing)
    getUserById: async (req, res) => {
      try {
        const { id } = req.params;
        const User = require('../models/user.model');
        if (!id) return res.status(400).json({ message: 'User id required' });

        const user = await User.findById(id).select('_id fullName email photoURL createdAt');
        if (!user) return res.status(404).json({ message: 'User not found' });

        return res.status(200).json({ user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          photoURL: user.photoURL || null,
          createdAt: user.createdAt || null,
        }});
      } catch (err) {
        console.error('getUserById error:', err);
        return res.status(500).json({ message: 'Server error', error: err.message });
      }
    },
    // Delete user by id
    deleteUser: async (req, res) => {
      try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: 'User id required' });

        const User = require('../models/user.model');
        const deleted = await User.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: 'User not found' });

        // Clear cookie if present (best-effort)
        try { res.clearCookie('token'); } catch (e) {}

        return res.status(200).json({ message: 'User deleted successfully' });
      } catch (err) {
        console.error('deleteUser error:', err);
        return res.status(500).json({ message: 'Server error', error: err.message });
      }
    },
    // Delete food partner by id (and their food items)
    deleteFoodPartner: async (req, res) => {
      try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: 'FoodPartner id required' });

        const Food = require('../models/food.model');
        const deleted = await foodPartnerModel.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: 'FoodPartner not found' });

        // delete all food items associated with this partner
        try {
          await Food.deleteMany({ foodPartner: id });
        } catch (e) {
          console.error('Error deleting food items for partner:', e);
        }

        try { res.clearCookie('token'); } catch (e) {}

        return res.status(200).json({ message: 'FoodPartner and their content deleted successfully' });
      } catch (err) {
        console.error('deleteFoodPartner error:', err);
        return res.status(500).json({ message: 'Server error', error: err.message });
      }
    },
}