import mongoose from "mongoose"

const userPostSchema = new mongoose.Schema({
    status:{
        type:String
    },
    picture:{
        type:String
    },
    likes:{
        type:Number,
        default: 0
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    }
}, { timestamps:true })

export const UserPost = mongoose.model("UserPost", userPostSchema)