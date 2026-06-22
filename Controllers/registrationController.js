const catchAsync = require('../utils/catchAsync');
const Registrations = require('./../Models/registrationData');
const Events = require('./../Models/eventData');
const AppError = require('../utils/AppError');
const sendEmail = require("./../utils/email");

exports.register = catchAsync(async(req,res,next)=>{

    const existing = await Registrations.findOne({
        user:req.user._id,
        event:req.body.event
    });
    if(existing){
        return next(new AppError("Already registered for the event",400));
    }
    const Event = await Events.findById(req.body.event);
         if(!Event){
            return next(new AppError("No event exist with that id"));
         }
         if(Event.createdBy.toString()===req.user.id){
            return next(new AppError('Cannot register for your own event',400))
         }
    const registrations = await Registrations.create({
        user:req.user._id,
        event:
        req.body.event
    })
    const message = `Successfully Registered for  ${Event.name}
                   Here are events details:
                   Date : ${Event.date}`;
            await sendEmail({
    email: req.user.email,
    subject: 'Password Reset Token',
    message
});
    res.status(200).json({
        status:"success",
        message: `Successfully registered for ${Event.name}`
    })
});

exports.myRegistrations = catchAsync(async(req,res,next)=>{
    const registrations = await Registrations.find({
        user:
        req.user._id
    }).populate('event');

    res.status(200).json({
        status:"success",
        results:registrations.length,
        registrations
    })
});

exports.cancelRegistration = catchAsync(async(req,res,next)=>{
    const Event = await Registrations.findOne({
        user:req.user._id,
        event:req.params.id
    });
    console.log(req.user._id);
    console.log(req.params.id);
    const all = await Registrations.find();
    console.log(all);
    if(!Event){
        return next(new AppError(`You haven't registered for the event`,404))
    };
     await Registrations.findOneAndDelete({event:req.params.id,
        user:req.user._id
    });
    res.status(200).json({
        status:"success"
    })

})

