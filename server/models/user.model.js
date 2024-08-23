import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    bio:{
        type:String,
        default:""
    }
    
},{ timestamps:true })

export const User = mongoose.model("User", userSchema)