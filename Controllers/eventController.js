const express = require('express');

const Events = require('./../Models/eventData');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/AppError');
const Registrations = require('./../Models/registrationData');
exports.getEvents =(catchAsync( async(req,res,next)=>{
    
         const event = await Events.find();
    res.status(200).json({
        status : "success",
        no_of_events : event.length,
        data : {
            event
        }
    });
    
   
}));

exports.getEvent =  (catchAsync(async(req,res,next)=>{
          
           const event = await Events.findById(req.params.id);
           if(!event){
            return next(new AppError("No events exist with that id",404));
           }
    res.status(200).json({
        status : "success",
        
        data : {
            event
        }
            
        
    });
    
})
);

exports.createEvents = (catchAsync(async(req,res,next)=>{
      
         const newEvent = await Events.create({...req.body,
            createdBy:req.user._id
         });
    res.status(200).json({
        status : "success",
        
        data : {
            newEvent
        }
    });
    
})
);

exports.deleteEvents = (catchAsync(async(req,res,next)=>{
       const Event = await Events.findById(req.params.id);
      
         
           if(Event.createdBy.toString()!=req.user.id){
            return next(new AppError('You can delete only your own events'))
           }
           if(!Event){
            return next(new AppError("No events exist with that id",404));
           }
             const event = await Events.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status : "success",
        
        data : null
            
        
    });
   

})
);

exports.updateEvents = (catchAsync(async(req,res,next)=>{
          
           const event = await Events.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators:true
           });
           if(event.createdBy.toString()!=req.user.id){
            return next(new AppError('You can  only modify your own events',403))
           };
           if(!event){
            return next(new AppError("No events exist with that id",404));
           }
    res.status(200).json({
        status : "success",
        
        data : {
            event
        }
            
        
    });
    
})
);

exports.getParticipant = (catchAsync(async(req,res,next)=>{
    
   
    const event = await Events.findById(req.params.id);
    if(req.user.role==='host' && event.createdBy.toString()!==req.user._id.toString()){
        return next(new AppError("You can see only your Event's participants",403));
    }
     const participants = await Registrations.find({event:req.params.id}).populate('user','name email department year');
    res.status(200).json({
        status:"success",
        results:participants.length,
        participants
    });
}))