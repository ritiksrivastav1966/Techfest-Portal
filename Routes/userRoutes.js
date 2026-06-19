const express = require('express');
const authController = require('./../Controllers/authController');

const router = express.Router();
console.log("Hi");
router.
     post('/signup',authController.signup)
     .post('/login',authController.login)
     .patch('/updateRoles',authController.protect,authController.restrictTo('admin'),authController.updateRoles);




module.exports = router;