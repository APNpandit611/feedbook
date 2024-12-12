import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import axios from "axios";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import ThreeDots from "./ThreeDots";
import { USER_POST_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import {
    FaThumbsUp,
    FaRegHeart,
    FaLaughSquint,
    FaHeart,
    FaLaugh,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const UserPost = () => {
    const [userPost, setUserPost] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(false);
    const editedItem = useSelector((store) => store.postUpdate.editedItem);
    const user = useSelector((store) => store.user.user);
    const userId = user?._id;

    //     await axios.post(`${USER_POST_API_END_POINT}/react`, {
    //         postId: postId,
    //         reactions: reactType,
    //     });
    //     console.log(`Post ID: ${postId}, Reaction: ${reactType}`);
    // } catch (error) {
    //     console.log(error)
    // }

    useEffect(() => {
        const fetchUserPost = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${USER_POST_API_END_POINT}/get`, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                const sortedPosts = (res.data?.posts || []).sort(
                    (a, b) =>
                        new Date(b.updatedAt || b.createdAt) -
                        new Date(a.updatedAt || a.createdAt)
                );
                setUserPost(sortedPosts); // Ensure it's always an array
            } catch (error) {
                console.error(error);
                //setUserPost([]); // Fallback to an empty array on error
                toast.error(error.response.data.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUserPost();
    }, []);

    const handleReaction = async (reaction, postId) => {
        try {
            const res = await axios.post(
                `${USER_POST_API_END_POINT}/${postId}/react`,
                {
                    reaction,
                    userId,
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            if (res.data.success) {
                toast.success(res.data.message);
                setUserPost((prevPosts) =>
                    prevPosts.map((post) =>
                        post._id === postId
                            ? { ...post, reactions: res.data.post?.reactions }
                            : post
                    )
                );
                // setUserReactions((prevReactions) => ({
                //     ...prevReactions,
                //     [postId]: reaction,
                // }));
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        }
    };

    return loading ? (
        <Spinner />
    ) : (
        <div className="flex flex-col items-center justify-center h-full mx-3">
            {Array.isArray(userPost) && userPost.length > 0 ? (
                userPost.map((post) => (
                    <div
                        key={post._id}
                        className="w-full md:w-9/12 lg:w-7/12 border border-gray-300 rounded-lg shadow-lg px-3 mx-auto my-3"
                    >
                        <div className="flex items-center justify-between px-3 py-1">
                            <div className="flex items-center gap-x-1">
                                <Avatar>
                                    <AvatarImage
                                        src={
                                            post.createdBy?.picture ||
                                            "https://github.com/shadcn.png"
                                        }
                                        alt="User"
                                    />
                                </Avatar>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">
                                        {post.createdBy?.name}
                                    </p>
                                    <div className="flex ">
                                        <p className="text-xs text-gray-800">
                                            {new Date(
                                                post.updatedAt
                                            ).toLocaleDateString("en-GB", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </p>
                                        {editedItem.includes(post._id) && (
                                            <p className="text-xs text-gray-800 ml-2">
                                                edited
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <ThreeDots post={post} />
                        </div>
                        <div className="py-1 px-3">{post.status}</div>
                        {post.picture && (
                            <img
                                src={post.picture}
                                alt="Post"
                                className="w-full h-72 object-cover rounded-lg "
                            />
                        )}
                        <div className="flex justify-between">
                            <div className="flex space-x-3 m-4">
                                <button
                                    onClick={() =>
                                        handleReaction("like", post._id)
                                    }
                                    className="flex items-center text-gray-700 hover:text-blue-500"
                                >
                                    <FaThumbsUp size={20} className="mr-2" />
                                    <span>
                                        {post.reactions?.filter(
                                            (r) => r.reaction === "like"
                                        ).length || 0}
                                    </span>
                                </button>

                                <button
                                    onClick={() =>
                                        handleReaction("heart", post._id)
                                    }
                                    className="flex items-center text-gray-700 hover:text-red-500"
                                >
                                    <FaRegHeart size={20} className="mr-2" />
                                    <span>
                                        {post.reactions?.filter(
                                            (r) => r.reaction === "heart"
                                        ).length || 0}
                                    </span>
                                </button>

                                <button
                                    onClick={() =>
                                        handleReaction("laugh", post._id)
                                    }
                                    className="flex items-center text-gray-700 hover:text-yellow-500"
                                >
                                    <FaLaughSquint size={20} className="mr-2" />
                                    <span>
                                        {post.reactions?.filter(
                                            (r) => r.reaction === "laugh"
                                        ).length || 0}
                                    </span>
                                </button>
                            </div>
                            <div className="mt-3 mr-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button className="border px-2 py-1 rounded-md text-sm">
                                            See React
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <ScrollArea className="h-auto w-60 rounded-md border">
                                            <div className="p-4">
                                                <div>
                                                    {post.reactions?.map(
                                                        (r) => (
                                                            <div key={r._id}>
                                                                <div className="flex items-center justify-between space-x-2">
                                                                    <span className="font-medium text-gray-800">
                                                                        {
                                                                            r
                                                                                .userId
                                                                                ?.name
                                                                        }
                                                                    </span>
                                                                    <span className="text-gray-600">
                                                                        {r.reaction ===
                                                                            "like" && (
                                                                            <FaThumbsUp className="text-blue-500" />
                                                                        )}
                                                                        {r.reaction ===
                                                                            "heart" && (
                                                                            <FaHeart className="text-red-500" />
                                                                        )}
                                                                        {r.reaction ===
                                                                            "laugh" && (
                                                                            <FaLaugh className="text-yellow-500" />
                                                                        )}
                                                                    </span>
                                                                </div>
                                                                <Separator className="my-2" />
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </ScrollArea>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No posts available.</p>
            )}
        </div>
    );
};

export default UserPost;
