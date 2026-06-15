const express = require('express');

const Events = require('./../Models/eventData');

exports.getEvents =( async(req,res)=>{
    try{
         const event = await Events.find();
    res.status(200).json({
        status : "success",
        no_of_events : event.length,
        data : {
            event
        }
    });
    }catch(err){
        res.status(500).json({
            status : 'fail',
            message : err.message
        })
    }
   
});

exports.getEvent =  (async(req,res)=>{
          try{
           const event = await Events.findById(req.params.id);
           if(!event){
            return res.status(404).json({
                status : 'fail',
                message:'No event exist with that id'
            })
           }
    res.status(200).json({
        status : "success",
        
        data : {
            event
        }
            
        
    });
    }catch(err){
        res.status(500).json({
            status : 'fail',
            message : err.message
        })
    }
});

exports.createEvents = (async(req,res)=>{
      try{
         const newEvent = await Events.create(req.body);
    res.status(200).json({
        status : "success",
        
        data : {
            newEvent
        }
    });
    }catch(err){
        res.status(500).json({
            status : 'fail',
            message : err.message
        })
    }
});

exports.deleteEvents = (async(req,res)=>{
  
      try{
           const event = await Events.findByIdAndDelete(req.params.id);
           if(!event){
            return res.status(404).json({
                status : 'fail',
                message:'No event exist with that id'
            })
           }
    res.status(204).json({
        status : "success",
        
        data : null
            
        
    });
    }catch(err){
        res.status(500).json({
            status : 'fail',
            message : err.message
        })
    }

});

exports.updateEvents = (async(req,res)=>{
          try{
           const event = await Events.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators:true
           });
           if(!event){
            return res.status(404).json({
                status : 'fail',
                message:'No event exist with that id'
            })
           }
    res.status(200).json({
        status : "success",
        
        data : {
            event
        }
            
        
    });
    }catch(err){
        res.status(500).json({
            status : 'fail',
            message : err.message
        })
    }
});