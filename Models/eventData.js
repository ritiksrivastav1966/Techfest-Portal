const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name : {
        type: String,
        unique : true,
        required : [true,'Events must have a name']

    },
    organising_club : {
        type: String,
        required : [true,'Please specify the associated club or fill independent']
    },
    date : {
        type : Date,
        required : [true,'Please provide the date of the event']
    },
    Host : {
        type : String,
        required : [true,'Please provide name of host']
    },
    description : {
        type : String,
        required : [true,'Tell something about the event']
    },
    createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'Users',
    required: true
},
status:{
    type:String,
    enum:[
        'upcoming',
        'completed'
    ],
    default:'upcoming'
},
reminderSent:{
    type:Boolean,
    default:false
}
    
});

module.exports = mongoose.model('Events',eventSchema);