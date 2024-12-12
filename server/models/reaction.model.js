import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema(
    {
        reactions: {
            likes: {
                type: Number,
                default: 0,
            },
            heart: {
                type: Number,
                default: 0,
            },
            laugh: {
                type: Number,
                default: 0,
            },
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

export const Reaction = mongoose.model("Reaction", reactionSchema);
