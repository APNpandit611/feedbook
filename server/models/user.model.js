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
    },
    phone:{
        type:Number,
    },
    bio:{
        type:String,
        default:""
    },
    googleId:{
        type:String
    }
    
},{ timestamps:true })

export const User = mongoose.model("User", userSchema)