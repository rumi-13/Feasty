const express = require('express');
const authController = require("../controllers/auth.controller")
// Require router
const router = express.Router();


// user auth APIs
router.post('/user/register', authController.registerUser);
router.get('/user/login', authController.loginUser);
router.get('/user/logout', authController.logoutUser);

// foodPartner auth APIs
router.post('/foodpartner/register', authController.registerFoodPartner);
router.get('/foodpartner/login', authController.loginFoodPartner);
router.get('/foodpartner/logout', authController.logoutFoodPartner);
module.exports = router;