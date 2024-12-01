import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import React, { useState } from "react";
import axios from "axios";
import { USER_POST_API_END_POINT } from "@/utils/constant.js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/store/loadingSlice";
import ButtonSpinner from "./shared/ButtonSpinner";

const CreatePost = () => {
    const dispatch = useDispatch();
    // const user = JSON.parse(localStorage.getItem("user"));
    const user = useSelector((store) => store.user.user);
    const loading = useSelector((store) => store.loading.loading);
    const [input, setInput] = useState({
        status: "",
        picture: "",
    });

    const inputHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileInputHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("status", input.status);
        if (input.file) {
            formData.append("picture", input.file);
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(
                `${USER_POST_API_END_POINT}/userPost`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );
            if (res.data.success) {
                toast.success(res.data.message);
                window.location.reload();
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="flex items-center justify-center mx-2 mt-2">
            <form
                onSubmit={submitHandler}
                className="w-full md:w-9/12 lg:w-7/12 border border-gray-300 rounded-lg shadow-lg p-3 transform transition-all duration-300 ease-in-out"
            >
                <div className="flex items-center gap-4 w-full border-b border-gray-300 focus:outline-none focus:ring-2 px-3 py-1">
                    <Avatar className="cursor-pointer">
                        <AvatarImage
                            src={
                                user.picture ?? "https://github.com/shadcn.png"
                            }
                            className="w-20 h-3/4 rounded-xl"
                            alt="@shadcn"
                        />
                    </Avatar>
                    <textarea
                        name="status"
                        onChange={inputHandler}
                        value={input.status}
                        className="w-full p-3"
                        type="text"
                        placeholder="How are you feeling? Write here.."
                    />
                </div>
                <div className="flex items-center justify-between m-1">
                    <input
                        accept="image/*"
                        type="file"
                        name="picture"
                        onChange={fileInputHandler}
                    />
                    {loading ? (
                        <ButtonSpinner />
                    ) : (
                        <Button
                            className="bg-[#202020] text-white"
                            variant="outline"
                            type="submit"
                        >
                            Post
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
