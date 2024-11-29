import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { USER_POST_API_END_POINT } from "@/utils/constant";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { toast } from "sonner";
import Spinner from "./shared/Spinner";
// import { useSelector } from "react-redux";
const EditPost = () => {
    const [input, setInput] = useState({
        status: "",
        picture: "",
    });
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [isEdited, setIsEdited] = useState(false);
    // const user = useSelector((store)=>store.user.user)
    const navigate = useNavigate();

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
                setInput({
                    status: res.data.post.status,
                });
                setPost(res.data.post);
                setLoading(false);
            } catch (error) {
                console.log(error);
                toast(error.res.data.message);
            } finally {
                setLoading(false);
            }
        };
        getPost();
    }, [id]);

    const inputHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileInputHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("status", input.status);
        if (input.file) formData.append("picture", input.file);
        try {
            const res = await axios.put(
                `${USER_POST_API_END_POINT}/update/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );
            setIsEdited(true);
            setLoading(false);
            if (res.data.success) {
                setLoading(false);
                navigate("/home");
                toast(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.res.data.message);
        }
    };

    return loading ? (
        <Spinner />
    ) : (
        <div>
            <form onSubmit={submitHandler}>
                <div className="w-full md:w-2/3 lg:w-6/12 border border-gray-300 rounded-lg shadow-lg px-3 mx-auto my-3 transform transition-all duration-300 ease-in-out">
                    <div className="flex items-center justify-between gap-x-1 w-full border-b border-gray-300 focus:outline-none focus:ring-2 px-3 py-1">
                        <div className="flex items-center gap-x-1">
                            <div className="flex items-center justify-center border rounded-full border-gray-300 focus:outline-none focus:ring-2 w-14 h-14">
                                <Avatar className="cursor-pointer ">
                                    <AvatarImage
                                        src={
                                            post.createdBy?.picture ||
                                            "https://github.com/shadcn.png"
                                        }
                                        alt="@shadcn"
                                        className="rounded-full"
                                    />
                                </Avatar>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-800">
                                    {post.createdBy?.name}
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
                                <p>{isEdited ? <p>. edited</p> : null}</p>
                            </div>
                        </div>
                    </div>

                    <div className="py-1 px-2">
                        <textarea
                            name="status"
                            onChange={inputHandler}
                            value={input.status}
                            className="w-full p-3"
                            type="text"
                        />
                    </div>
                    {post.picture ? (
                        <div className="w-full h-64 sm:h-80 lg:h-96 overflow-hidden rounded-lg shadow-md">
                            <img
                                src={post.picture}
                                alt="post image"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : null}

                    <div className="border-t border-gray-300 focus:outline-none focus:ring-2 flex justify-between items-center">
                        <input
                            accept="image/*"
                            type="file"
                            name="picture"
                            onChange={fileInputHandler}
                            placeholder="Upload Image"
                        />
                        <Button
                            className="bg-[#202020] text-white m-3"
                            variant="outline"
                            type="submit"
                        >
                            Update
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditPost;
