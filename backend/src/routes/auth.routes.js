const express = require('express');
const authController = require("../controllers/auth.controller")
// Require router
const router = express.Router();


// create user route
router.post('/user/register', authController.registerUser);

module.exports = router;