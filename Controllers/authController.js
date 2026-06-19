const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const Users = require('./../Models/usersdata');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');

const signToken = id => {
    return jwt.sign(
         {id},
         process.env.JWT_SECRET,
         {expiresIn:process.env.JWT_EXPIRES_IN}
    );
};


exports.signup = catchAsync(async(req,res,next)=>{
    const newUser = await Users.create({
        name : req.body.name,
        email : req.body.email,
        password: req.body.password,
        confirm_password:req.body.confirm_password,
        department:req.body.department,
        year:req.body.year
    });
 const token = signToken(newUser._id);
 newUser.password = undefined;
    res.status(201).json({
        status : 'success',
        data:{
           User: newUser,
           token: token
        }
    })
});
exports.login = catchAsync(async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return next(new AppError("Please provide email and password",400));
    }
    const user = await Users.findOne({email}).select('+password');
    if(!user){
        return next(new AppError("No user find with that email",404));
    }
    const correct = await user.correctPassword(req.body.password,user.password);
    if(!correct){
        return next(new AppError("Incorrect password! if forget click forget",401));
    };
    const token = signToken(user._id);
    res.status(200).json({
        status:'success',
        token
    })
});

exports.protect = catchAsync( async(req,res,next)=>{
    //1) Get token and check if its still there
     let token;
     if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
        
     ){
        token = req.headers.authorization.split(' ')[1];
     }

     console.log(token);
    
     if(!token){
     return   next(new AppError('You are not logged in',401));
     }

     //2)token verification

   const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
   console.log(decoded);
    //3) Check if user still exists
   const freshUser = await Users.findById(decoded.id);
   if(!freshUser){
    return next(new AppError('Token to this user no longer exist',401));
   }
    

   

   req.user = freshUser;
    next();
}

);

exports.updateRoles = catchAsync(async(req,res,next)=>{
    const {email,role,adminKey} = req.body;
    if(adminKey!==process.env.ADMIN_KEY){
        return next(new AppError("Invalid admin key",403));
    }
    const allowedRoles = ['host','admin'];
    if(!allowedRoles.includes(role)){
        return next(new AppError("Invalid role add host or admin",400));
    }
    
    const user = await Users.findOneAndUpdate({email},{role},{returnDocument:'after'});
    if(!user){
        return next(new AppError("No user exists with this email",404));
    }
    
    res.status(200).json({
        status : 'success',
        message :'Role updated successfully',
        data : {
            user
        }
    });
});
exports.restrictTo = (...roles)=>{
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(new AppError('You have no permission to access this feature',403));
        }
        next();
    }
   
};