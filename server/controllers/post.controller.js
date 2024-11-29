import { UserPost } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import uploadImage from "../utils/cloudinary.js";

export const userPost = async (req, res) => {
    try {
        const { status } = req.body;
        const userId = req.id;
        let pictureUrl = null;
        if (req.file) {
            // cloudinary gives the url for image.
            // const cloudinaryResponse = await uploadImage(req.file.path);
            const cloudinaryResponse = await uploadImage(req.file.buffer, req.file.originalname); 
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
        console.log(posts)
        // const posts = await UserPost.find({})
        if (!posts) {
            return res.status(404).json({
                message: "No posts found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "all posts retreived",
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

        if (status) post.status = status;
        if (file) {
            const cloudinaryRes = await uploadImage(req.file.path);
            post.picture = cloudinaryRes.secure_url;
        }
        await post.save();

        const updatedPost = {
            status: post.status,
            picture: post.picture,
        };

        // const updatePost = await UserPost.findByIdAndUpdate(
        //     postId,
        //     updatedPost,
        //     { new: true }
        // );

        return res.status(201).json({
            message: "Post Updated",
            // post: updatePost,
            post: updatedPost,
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};

export const deletePostById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.id;

        await UserPost.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Post Deleted successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};
