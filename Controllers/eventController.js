const express = require('express');

const Events = require('./../Models/eventData');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/AppError');
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

exports.createEvents = (catchAsync(async(req,res)=>{
      
         const newEvent = await Events.create(req.body);
    res.status(200).json({
        status : "success",
        
        data : {
            newEvent
        }
    });
    
})
);

exports.deleteEvents = (catchAsync(async(req,res,next)=>{
  
      
           const event = await Events.findByIdAndDelete(req.params.id);
           if(!event){
            return next(new AppError("No events exist with that id",404));
           }
    res.status(204).json({
        status : "success",
        
        data : null
            
        
    });
   

})
);

exports.updateEvents = (catchAsync(async(req,res)=>{
          
           const event = await Events.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators:true
           });
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