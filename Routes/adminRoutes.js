const express = require('express');
const adminController = require('./../Controllers/admincontroller');
const authController = require('./../Controllers/authController');

const router = express.Router();

router.get('/',authController.protect,authController.restrictTo('admin'),adminController.getstats);

module.exports = router;
