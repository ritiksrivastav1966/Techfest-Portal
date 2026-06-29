const express = require('express');
const authController = require('./../Controllers/authController');
const reviewController = require('./../Controllers/reviewController');

const router = express.Router();

router.post('/:eventId',authController.protect,authController.restrictTo('student'),reviewController.createReview)
      
.get('/:eventId',authController.protect,reviewController.getReview)
.patch('/:id',authController.protect,reviewController.editReview);
      

module.exports = router;


