const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    profileimg:{type:String,required:false,trim:true},
    name:{type:"string",required:"true",trim:true},
    emailId:{type:"string",required:"true",trim:true,unique:true},
    password:{type:"string",required:"true",trim:true},
    otp:{type:"string",required:"true",trim:true},
    isDeleted:{type:"boolean",default:false},
    isVerify:{type:Boolean,default:false},
    isaccountactive:{type:Boolean,default:false},
    role:{type:String,enum:['user','Admin'],required:true,trim:true}
    
    
},
{timeseries:true},
)
module.exports = mongoose.model("userdatabase",userSchema)