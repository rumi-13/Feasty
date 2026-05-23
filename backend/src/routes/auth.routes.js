const express = require('express');
const authController = require("../controllers/auth.controller")
// Require router
const router = express.Router();


// user auth APIs
router.post('/user/register', authController.registerUser);
router.post('/user/login', authController.loginUser);
router.get('/user/logout', authController.logoutUser);

// Google signup routes
router.post('/user/register-google', authController.registerUserWithGoogle);
// Public endpoint to fetch user by id
router.get('/user/:id', authController.getUserById);
// Delete user (account removal)
router.delete('/user/:id', authController.deleteUser);
// Delete food partner account and content
router.delete('/foodpartner/:id', authController.deleteFoodPartner);

// foodPartner auth APIs
router.post('/foodpartner/register', authController.registerFoodPartner);
router.post('/foodpartner/login', authController.loginFoodPartner);
router.get('/foodpartner/logout', authController.logoutFoodPartner);

// Google signup routes
router.post('/foodpartner/register-google', authController.registerFoodPartnerWithGoogle);

// Google Sign-In route (shared for both users and foodpartners)
router.post('/verify-google-token', authController.verifyGoogleToken);

// Export
module.exports = router;