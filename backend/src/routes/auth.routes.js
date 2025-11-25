const express = require('express');
const authController = require("../controllers/auth.controller")
// Require router
const router = express.Router();


// create user route
router.post('/user/register', authController.registerUser);
router.get('/user/login', authController.loginUser);
router.get('/user/logout', authController.logoutUser);
module.exports = router;