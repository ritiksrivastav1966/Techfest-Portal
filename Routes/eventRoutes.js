const express = require('express');

const eventController = require('./../Controllers/eventController');
const authController = require('./../Controllers/authController');

const router = express.Router();

router
     .get('/',eventController.getEvents)
     .post('/',authController.protect,authController.restrictTo('host','admin'),eventController.createEvents);
router
     .get('/:id',eventController.getEvent)
     .patch('/:id',authController.protect,authController.restrictTo('host'),eventController.updateEvents)
    .delete('/:id',authController.protect,authController.restrictTo('admin'),eventController.deleteEvents);

module.exports = router;