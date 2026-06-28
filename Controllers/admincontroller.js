const express = require('express');
const Users = require('./../Models/usersdata');
const Events = require('./../Models/eventData');
const Registrations = require('./../Models/registrationData');
const catchAsync = require('../utils/catchAsync');

exports.getstats = catchAsync(async(req,res,next)=>{
     const totalUsers = await Users.countDocuments();
     const totalStudents = await Users.countDocuments({
        role:'student'
     });
     const totalHosts = await Users.countDocuments({
        role:'host'
     });
     const totalEvents = await Events.countDocuments();
     const totalRegistrations = await Registrations.countDocuments();
     const upcomingEvents = await Events.countDocuments({
        date:{
            $gt:Date.now()
        }
     });
    const completedEvents = await Events.countDocuments({
        date:{
            $lt:Date.now()
        }
    });
    const popular = await Registrations.aggregate([
        {
            $group:{
                _id:'$event',
                registrations:{
                    $sum:1
                }
            }
        },
        {
            $sort:{
                registrations:-1
            }
        },
        {
            $limit:1
        }
    ]);
    const Event = await Events.findById(popular[0]._id);
    const stats = await Registrations.aggregate([

    {
        $lookup: {
            from: 'events',
            localField: 'event',
            foreignField: '_id',
            as: 'event'
        }
    },

    {
        $unwind: '$event'
    },

    {
        $group: {
            _id: '$event.organising_club',
            registrations: {
                $sum: 1
            }
        }
    }

]);
const recent =
await Registrations
.find()

.sort('-registeredAt')

.limit(5)

.populate(
    'user',
    'name email'
)

.populate(
    'event',
    'name'
);
const mostActiveHost = await Registrations.aggregate([
    {
        $lookup: {
            from: 'events',
            localField: 'event',
            foreignField: '_id',
            as: 'event'
        }
    },

    {
        $unwind: '$event'
    },

    {
        $group: {
            _id: '$event.createdBy',

            totalRegistrations: {
                $sum: 1
            }
        }
    },

    {
        $sort: {
            totalRegistrations: -1
        }
    },

    {
        $limit: 1
    }
]);
const host = await Users.findById(mostActiveHost[0]._id);
    res.status(200).json({
        status:"status",
        data:{
            totalUsers:totalUsers,
            totalStudents :totalStudents ,
            totalHosts:totalHosts,
            totalEvents:totalEvents,
            totalRegistrations:totalRegistrations,
            upcomingEvents:upcomingEvents ,
            completedEvents:completedEvents,
            Popular_Events:{
                name:Event.name,
                host:Event.host,
                registrations:popular[0].registrations
            },
            Registrations_per_club:stats,
            Recent_registrations:recent,
            mostActiveHost:{
                name:host.name,
                email:host.email,
                totalRegistrations:mostActiveHost[0].totalRegistrations
            }





        }
    })

});

