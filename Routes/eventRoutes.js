const express = require('express');

const eventController = require('./../Controllers/eventController');

const router = express.Router();

router
     .get('/',eventController.getEvents)
     .post('/',eventController.createEvents);
router
     .get('/:id',eventController.getEvent)
     .patch('/:id',eventController.updateEvents)
    .delete('/:id',eventController.deleteEvents);

module.exports = router;