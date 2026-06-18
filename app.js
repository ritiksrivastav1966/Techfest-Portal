const express = require('express');
const app = express();
const eventRoutes = require('./Routes/eventRoutes');
const userRoutes = require('./Routes/userRoutes');
const AppError = require('./utils/AppError');
const globalHandlingError = require('./Controllers/errorController');
app.use(express.json());
app.get('/',(req,res)=>{
    res.status(200).json({
        result : "Just a test"
    });
});
app.use('/techfest/v1/events',eventRoutes);
app.use('/techfest/v1/users',userRoutes);

app.all('*splat',(req,res,next)=>{
    


    next(new AppError(`can't find ${req.originalUrl} on this server`,404));

});
app.use(globalHandlingError);

module.exports = app;