import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import axios from "axios";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import ThreeDots from "./ThreeDots";
import { USER_POST_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { FaThumbsUp, FaRegHeart, FaLaughSquint } from "react-icons/fa";
import { useSelector } from "react-redux";

const UserPost = () => {
    const [userPost, setUserPost] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(false);
    const editedItem = useSelector((store) => store.postUpdate.editedItem);

    useEffect(() => {
        const fetchUserPost = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${USER_POST_API_END_POINT}/get`, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                const sortedPosts = (res.data?.posts || []).sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                )
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
                                                post.createdAt
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
                                className="w-full h-64 object-cover rounded-lg"
                            />
                        )}
                        <div className="reaction-buttons flex space-x-3 m-4">
                            <button className="flex items-center text-gray-700 hover:text-blue-500">
                                <FaThumbsUp size={20} className="mr-2" />
                                <span>{post.likes}</span>
                            </button>

                            <button className="flex items-center text-gray-700 hover:text-blue-500">
                                <FaRegHeart size={20} className="mr-2" />
                                <span>{post.likes}</span>
                            </button>

                            <button className="flex items-center text-gray-700 hover:text-blue-500">
                                <FaLaughSquint size={20} className="mr-2" />
                                <span>{post.likes}</span>
                            </button>
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
