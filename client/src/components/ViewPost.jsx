import React, { useEffect, useState } from "react";
import { USER_POST_API_END_POINT } from "@/utils/constant";
import Spinner from "./shared/Spinner";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewPost = () => {
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const getPost = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    `${USER_POST_API_END_POINT}/get/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                );
                setPost(res.data.post);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getPost();
    }, [id]);

    return loading ? (
        <Spinner />
    ) : (
        <div>
            <div className="flex flex-col gap-y-5">
                <div className="">
                    <span className="text-lg mr-4">Post Id:</span>
                    <span>{post._id}</span>
                </div>
                <div>
                    <span className="text-lg mr-4">Status:</span>
                    <span>{post.status}</span>
                </div>
                <div>
                    <span className="text-lg mr-4">User ID:</span>
                    <span>{post.createdBy?._id}</span>
                </div>
                <div>
                    <span className="text-lg mr-4">Name:</span>
                    <span>{post.createdBy?.name}</span>
                </div>
                <div>
                    <span className="text-lg mr-4">Email:</span>
                    <span>{post.createdBy?.email}</span>
                </div>

                <div>
                    <span className="text-lg mr-4">Created At:</span>
                    <span>
                        {new Date(post.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}
                    </span>
                </div>
                <div className="w-1/3 h-64 sm:h-80 lg:h-96 overflow-hidden rounded-lg shadow-md">
                    <img
                        src={post.picture}
                        alt="post image"
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default ViewPost;
