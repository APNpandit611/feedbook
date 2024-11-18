import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import axios from "axios";
import { FastForward } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThreeDots from "./ThreeDots";

const UserPost = () => {
    const [userPost, setUserPost] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserPost = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    "http://localhost:3001/api/v1/post/get/",
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                );
                setUserPost(res.data.posts);
            } catch (error) {
                console.log(error);
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
            {userPost.map((post) => (
                <div
                    key={post._id}
                    className="w-full md:w-9/12 lg:w-7/12 border border-gray-300 rounded-lg shadow-lg px-3 mx-auto my-3 transform transition-all duration-300 ease-in-out"
                >
                    <div className="flex items-center justify-between gap-x-1 w-full border-b border-gray-300 focus:outline-none focus:ring-2 px-3 py-1">
                        <div className="flex items-center gap-x-1">
                            <div className="flex items-center justify-center border border-gray-300 rounded-full focus:outline-none focus:ring-2">
                                <Avatar className="cursor-pointer">
                                    <AvatarImage
                                        src={
                                            post.createdBy.picture ||
                                            "https://github.com/shadcn.png"
                                        }
                                        alt="@shadcn"
                                    />
                                </Avatar>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-800">
                                    {post.createdBy.name}
                                </p>
                                <p className="text-xs text-gray-800">
                                    {new Date(
                                        post.createdAt
                                    ).toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>
                        <div>
                            <ThreeDots postId={post._id} />
                        </div>
                    </div>

                    <div className="py-1 px-3">{post.status}</div>
                    {post.picture ? (
                        <div className="w-full h-64 sm:h-80 lg:h-96 overflow-hidden rounded-lg shadow-md">
                            <img
                                src={post.picture}
                                alt="post image"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : null}
                </div>
            ))}
        </div>
    );
};

export default UserPost;
