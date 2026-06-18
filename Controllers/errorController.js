const AppError = require("../utils/AppError");

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode||500;
    err.status = err.status||'error';
    if(process.env.NODE_ENV==='development'){
            res.status(err.statusCode).json({
        status : err.status,
        message : err.message,
        error : err,
        stack : err.stack

    });
    }else if(process.env.NODE_ENV==='production'){
        if(err.code===11000){
            const field = Object.keys(err.keyValue)[0];
            const value = err.keyValue[field];

            err = new AppError(
                `${field} , ${value} already exists`,400
            );
        }

        if(err.name==='CastError'){
            err = new AppError('Invalid Id format',400);
        }
        if(err.name==='ValidationError'){
            const errors = Object.values(err.errors).map(el=>el.message).join('.');
            err = new AppError(errors,400);
        }
        if(err.isOperational){
              res.status(err.statusCode).json({
        status : 'fail',
        message : err.message

    });
    
        }
        else{
            res.status(500).json({
                status : 'fail',
                message:'Something went wrong!'
            })
        }
             
    }
   
};