import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import axios from "axios";
import { FastForward } from "lucide-react";

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
        <div>
            {userPost.map((post) => (
                <div
                    key={post._id}
                    className="w-1/4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 m-3"
                >
                    <div className="flex items-center gap-4 w-full border-b border-gray-300 focus:outline-none focus:ring-2 px-3 py-1">
                        <div className="flex items-center justify-center w-14 h-14 border border-gray-300 rounded-full focus:outline-none focus:ring-2">
                            circle
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
