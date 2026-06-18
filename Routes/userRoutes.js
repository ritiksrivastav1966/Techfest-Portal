const express = require('express');
const authController = require('./../Controllers/authController');

const router = express.Router();
console.log("Hi");
router.
     post('/signup',authController.signup)
     .post('/login',authController.login);




module.exports = router;