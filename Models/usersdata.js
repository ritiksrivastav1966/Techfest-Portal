const mongoose = require('mongoose');
const validator = require('validator');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
       name : {
        type : String,
        required: [true,"Please provide your name"]
       },
       email : {
        type : String,
        validate : [validator.isEmail,"Email must be valid"],
        unique:[true,"Already registered with this email"]
       },
       password:{
        type : String,
        required:[true,"Please provide the password"],
        validate:[validator.isStrongPassword,"Password must contain at least 8 characters, 1 lowercase letter,1 uppercase letter,1 number and a symbol"]
       },
       confirm_password : {
        type : String,
        required : [true,'Please confirm the password'],
        validate : {
        validator : function(el){
            return el === this.password;
        },
        message: "Password must be same"
    }
    },
       year:{
        type : Number,
        required:[true,"Please specify your Year"]
       },
       department:{
        type:String,
        required:[true,"Please specify your department"]
       },role: {
  type: String,
  enum: ['student', 'host', 'admin'],
  default: 'student'
},
     passwordresettoken : String,
    passwordresetexpires:Date
});

 userSchema.pre('save',async function(){
    if(!this.isModified('password'))return ;

    this.password = await bcrypt.hash(this.password,12);
    this.confirm_password = undefined;
    
 });
 userSchema.methods.correctPassword = async function(candidatepassword,userPassword) {
    return await bcrypt.compare(
               candidatepassword,
               userPassword
    );
 }

 userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordresettoken = crypto.createHash('sha256').update(resetToken).digest('hex');
    console.log({resetToken},this.passwordresettoken);
    this.passwordresetexpires = Date.now() + 10*60*1000;

    return resetToken;
    
}

module.exports = mongoose.model('Users',userSchema);
