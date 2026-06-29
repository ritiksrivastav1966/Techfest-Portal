
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

    review: {
        type: String,
        required: [true, 'Review cannot be empty']
    },

    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Please give a rating']
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'Users',
        required: true
    },

    event: {
        type: mongoose.Schema.ObjectId,
        ref: 'Events',
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

reviewSchema.index(
    {
        user:1,
        event:1
    },
    {
        unique:true
    }
);

module.exports = mongoose.model('Reviews',reviewSchema);