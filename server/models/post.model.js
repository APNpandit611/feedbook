import mongoose from "mongoose"

const userPostSchema = new mongoose.Schema({
    status:{
        type:String
    },
    picture:{
        type:String
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    }
}, { timestamps:true })

export const UserPost = mongoose.model("UserPost", userPostSchema)