const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');

dotenv.config({path : './.env'});
const DB =process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(()=>{
    console.log('DB connected successfully');
})
const port = 3000;
const server = app.listen(port ,()=>{
    console.log(`server running on ${port}`)
});