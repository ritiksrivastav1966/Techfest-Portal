process.on('unhandledRejection',err=>{
    console.log('UNCAUGHT EXCEPTION');
    console.log(err.name,err.message);
    process.exit(1);
})
const dotenv = require('dotenv');

dotenv.config({path : './.env'});
const mongoose = require('mongoose');


const app = require('./app');

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

process.on('unhandledRejection',err=>{
    console.log('UNCAUGHT Rejection');
    console.log(err.name,err.message);
    server.close(()=>{
        console.log("SERVER SHUTTING DOWN");
        process.exit(1);
    })

})