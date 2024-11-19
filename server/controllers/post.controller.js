import { UserPost } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import uploadImage  from "../utils/cloudinary.js";

export const userPost = async (req, res) => {
    try {
        const { status } = req.body;
        const userId = req.id;
        let pictureUrl = null

        if (req.file) {
            // Upload image to Cloudinary and get the URL
            const cloudinaryResponse = await uploadImage(req.file.path);
            pictureUrl = cloudinaryResponse.secure_url;
        }
        const post = await UserPost.create({
            status,
            picture: pictureUrl,
            createdBy: userId,
        });

        return res.status(201).json({
            message: "Post created successfully",
            post,
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};

export const getPosts = async (req, res) => {
    try {
        // const keyword = req.query.keyword || ""
        // const query = {
        //     $or: [
        //         {title: {$regex: keyword, $options: 'i'}},
        //         {title: {$regex: keyword, $options: 'i'}},
        //     ]
        // }
        // const userId = req.id;
        // const posts = await UserPost.find({ createdBy: userId });

        const posts = await UserPost.find({}).populate(
            "createdBy",
            "name email picture"
        );
        // const posts = await UserPost.find({})
        if (!posts) {
            return res.status(404).json({
                message: "No posts found",
                success: false,
            });
        }
        return res.status(200).json({
            posts,
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};

export const getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await UserPost.findById(postId).populate(
            "createdBy",
            "name email picture"
        );
        if (!post) {
            return res.status(404).json({
                message: "Post not found",
                success: false,
            });
        }
        return res.status(200).json({
            post,
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};

export const updatePostById = async (req, res) => {
    try {
        const { status } = req.body;
        const file = req.file;
        const postId = req.params.id;
        const userId = req.id;

        const post = await UserPost.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: "Post not found",
                success: false,
            });
        }

        if (post.createdBy.toString() !== userId) {
            return res.status(403).json({
                message: "User not authorized",
                success: false,
            });
        }

        const updatedPost = { status };
        const updatePost = await UserPost.findByIdAndUpdate(
            postId,
            updatedPost,
            { new: true }
        );

        return res.status(201).json({
            message: "Post Updated",
            post: updatePost,
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};
