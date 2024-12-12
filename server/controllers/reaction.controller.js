import { UserPost } from "../models/post.model.js";
import { User } from "../models/user.model.js";
// import { Reaction } from "../models/reaction.model.js";

export const reaction = async (req, res) => {
    try {
        // request reaction type and user id from the body
        const { reaction } = req.body;
        const { id } = req.params;
        const userId = req.id
        // find the post by id
        const post = await UserPost.findById(id)
        if (!post) {
            return res
                .status(404)
                .json({ message: "Post not found", success: false });
        }
        // if (reaction === "like")  post.reactions.likes += 1
        // if (reaction === "heart")  post.reactions.heart += 1
        // if (reaction === "laugh")  post.reactions.laugh += 1
        // check if any other input is given or reaction type is valid?
        if (!["like", "heart", "laugh"].includes(reaction)) {
            return res
                .status(400)
                .json({ message: "Invalid reaction", success: false });
        }
        // check if the user has already reacted to the post.
        const isUserReacted = post.reactions.find(
            reaction => reaction.userId?.toString() === userId
        );
        if (isUserReacted) {
            // return res.status(400).json({
            //     message: "You have already reacted to this post",
            //     success: false,
            // });
            if (isUserReacted.reaction === reaction) {
                // Remove the reaction if the same reaction type is clicked
                post.reactions = post.reactions.filter(
                    // filter by (not matching userId or reaction)
                    (reaction) => reaction.userId?.toString() !== userId || reaction.reaction !== reaction
                );
            } else {
                // Update the reaction type
                isUserReacted.reaction = reaction;
            }            
        } else {
            post.reactions.push({ userId, reaction })
        }

        // const newReaction = await Reaction.create({
        //     reactions: {  like: 0, heart: 0, laugh: 0, [reaction]: 1},
        //     user: userId
        // })
        
        // push the reaction  and userid in reactions array of Userpost schema
        await post.save();
        
        return res.status(200).json({
            post,
            message: "Reacted!",
            success: true,
        });
        

    } catch (error) {
        console.log(error);
    }
};

