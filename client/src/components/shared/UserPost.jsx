import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import axios from "axios";
import { FastForward } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserPost = () => {
    const [userPost, setUserPost] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));

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
                    className="w-full md:w-9/12 lg:w-7/12 border border-gray-300 rounded-lg shadow-lg p-6 mx-auto my-3 transform transition-all duration-300 ease-in-out"
                >
                    <div className="flex items-center gap-4 w-full border-b border-gray-300 focus:outline-none focus:ring-2 px-3 py-1">
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
                        <p className="text-gray-800">{post.createdBy.name}</p>
                    </div>
                    <div className="py-1 px-3">{post.status}</div>
                    
                </div>
            ))}
        </div>
    );
};

export default UserPost;
