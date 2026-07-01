const express = require('express');
const app = express();
const {rateLimit} = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const eventRoutes = require('./Routes/eventRoutes');
const userRoutes = require('./Routes/userRoutes');
const registerRoutes = require('./Routes/RegisRoutes');
const adminRoutes = require('./Routes/adminRoutes');
const reviewRoutes = require('./Routes/reviewRoutes');
const AppError = require('./utils/AppError');
const globalHandlingError = require('./Controllers/errorController');
app.use(express.json());
app.use(helmet());
app.use(compression());
const limiter = rateLimit({
    max:100,
    windowMs:60*60*1000,
    message:{
        status:"fail",
        message:"Too many requests from this IP, try again later"
    }
});
app.use('/techfest/v1',limiter);
app.use('/techfest/v1/events',eventRoutes);
app.use('/techfest/v1/users',userRoutes);
app.use('/techfest/v1/register',registerRoutes);
app.use('/techfest/v1/admin',adminRoutes);
app.use('/techfest/v1/review',reviewRoutes);
app.all('*splat',(req,res,next)=>{
    


    next(new AppError(`can't find ${req.originalUrl} on this server`,404));

});
app.use(globalHandlingError);

module.exports = app;