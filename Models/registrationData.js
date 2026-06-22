const mongoose = require('mongoose');
const Events = require('./eventData');
const Users = require('./usersdata');


const registrationsSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'Users',
        require:true
    },
        event:{
            type:mongoose.Schema.ObjectId,
            ref:'Events',
            required:[true,"Please specify the event"]
        },
        registeredAt:{
            type:Date,
            default:Date.now()
        }
});

registrationsSchema.index(
    {
        user:1,
        event:1
    },
    {
        unique:true
    }
);

module.exports = mongoose.model(
    'Registrations',
    registrationsSchema
);