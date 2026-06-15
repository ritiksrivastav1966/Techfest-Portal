const express = require('express');
const app = express();
const eventRoutes = require('./Routes/eventRoutes');

app.use(express.json());
app.get('/',(req,res)=>{
    res.status(200).json({
        result : "Just a test"
    });
});
app.use('/techfest/v1/events',eventRoutes);
module.exports = app;