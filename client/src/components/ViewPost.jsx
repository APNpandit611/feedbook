import React, { useEffect, useState } from "react";
import { USER_POST_API_END_POINT } from "@/utils/constant";
import Spinner from "./shared/Spinner";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ViewPost = () => {
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const user = useSelector((store) => store.user.user);

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
        <Card className="max-w-2xl mx-auto p-6 mt-4">
            <CardHeader>
                <CardTitle className="text-xl font-bold">
                    Post Details
                </CardTitle>
            </CardHeader>
            <Separator className="my-4" />
            <CardContent className="space-y-5">
                <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Post ID:</span>
                    <span>{post._id}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Status:</span>
                    <span>{post.status}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium text-gray-600">User ID:</span>
                    <span>{post.createdBy?._id}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-600">Name:</span>
                    <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                src={post.createdBy?.avatar}
                                alt={post.createdBy?.name}
                            />
                            <AvatarFallback>
                                {post.createdBy?.name?.charAt(0) || "U"}
                            </AvatarFallback>
                        </Avatar>
                        <span>{post.createdBy?.name}</span>
                    </div>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Email:</span>
                    <span>{post.createdBy?.email}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium text-gray-600">
                        Created At:
                    </span>
                    <span>
                        {new Date(post.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}
                    </span>
                </div>
                {post.picture ? (
                    <div className="w-full h-64 sm:h-80 lg:h-96 overflow-hidden rounded-lg shadow-md">
                        <img
                            src={post.picture}
                            alt="post image"
                            className="object-cover w-full h-full"
                        />
                    </div>
                ) : null}
            </CardContent>
        </Card>
    );
};

export default ViewPost;
