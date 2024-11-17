import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import React, { useState } from "react";
import axios from "axios";
import { USER_POST_API_END_POINT } from "@/utils/constant.js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


const CreatePost = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [input, setInput] = useState({
        status: "",
    });

    const navigate = useNavigate()

    const inputHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${USER_POST_API_END_POINT}/userPost`,
                input,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            if( res.data.success ){
                navigate("/home");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        }
    };

    return (
        <div className="flex items-center justify-center mx-2 mt-2">
            <div className="w-full md:w-9/12 lg:w-7/12 border border-gray-300 rounded-lg shadow-lg p-3 transform transition-all duration-300 ease-in-out">
                <div className="flex items-center gap-4 w-full border-b border-gray-300 focus:outline-none focus:ring-2 px-3 py-1">
                    <Avatar className="cursor-pointer">
                        <AvatarImage src={user.picture ?? 'https://github.com/shadcn.png'} className="w-20 h-3/4 rounded-xl"  alt="@shadcn" />
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
                    <div className="py-1 px-3 font-medium">{user.name}</div>
                    <Button
                        className="bg-[#202020] text-white"
                        variant="outline"
                        onClick={submitHandler}
                    >
                        Create
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
