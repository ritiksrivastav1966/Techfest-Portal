const express = require('express');
const authController = require("./../Controllers/authController");
const registerController = require("./../Controllers/registrationController");

const router = express.Router();

router
.post('/',authController.protect,registerController.register)
.get('/',authController.protect,registerController.myRegistrations)
.delete('/:id',authController.protect,authController.restrictTo('student'),registerController.cancelRegistration);

module.exports = router;