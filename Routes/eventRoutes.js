const express = require('express');

const eventController = require('./../Controllers/eventController');
const authController = require('./../Controllers/authController');

const router = express.Router();

router
     .get('/',eventController.getEvents)
     .post('/',authController.protect,eventController.createEvents);
router
     .get('/:id',eventController.getEvent)
     .patch('/:id',authController.protect,eventController.updateEvents)
    .delete('/:id',authController.protect,eventController.deleteEvents);

module.exports = router;