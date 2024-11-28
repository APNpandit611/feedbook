import { USER_POST_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Spinner from "./shared/Spinner";

const DeletePost = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
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
                setLoading(false);
            } catch (error) {
                console.error(error);
                toast.error(
                    error.response?.data?.message || "Failed to fetch post."
                );
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await axios.delete(`${USER_POST_API_END_POINT}/delete/${id}`);
            toast.success("Post deleted successfully!");
            navigate("/home");
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message || "Failed to delete post."
            );
        } finally {
            setLoading(false);
        }
    };

    return loading ? (
        <Spinner />
    ) : (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
                    Delete Post
                </h1>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="flex flex-col items-center text-center">
                        <h3 className="text-lg text-gray-700 mb-4">
                            Are you sure you want to delete:{" "}
                            <strong>{post?.status}</strong>?
                        </h3>
                        <p className="text-sm text-gray-500 mb-6">
                            This action cannot be undone. Once deleted, the Post
                            will be deleted forever.
                        </p>
                        <div className="flex space-x-4">
                            <button
                                onClick={handleDelete}
                                className="px-6 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-200"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => navigate(-1)} // Navigate back or provide a cancel action
                                className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeletePost;
