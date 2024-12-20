import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import Header from "../shared/Header";
import { Textarea } from "../ui/textarea";

const Signup = () => {
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
    });
    const navigate = useNavigate();

    const eventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        // const formData = new FormData();
        // formData.append("name", input.name);
        // formData.append("email", input.email);
        // formData.append("password", input.password);
        // formData.append("phone", input.phone);
        try {
            const res = await axios.post(
                `${USER_API_END_POINT}/register`,
                input,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    // const submitHandler = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const res = axios.post("http://localhost:3001/api/v1/user/login", {
    //             email: email,
    //             companyRole: role,
    //         });
    //     } catch (error) {
    //         toast.error(error.response.data.message)
    //     }
    // };

    // const [name, setName] = useState('')
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const navigate = useNavigate();

    // const handleInputChange = (event) => {
    //   const { name, value } = event.target;
    //   if (name === 'email') {
    //     setEmail(value);
    //   } else if (name === 'password') {
    //     setPassword(value);
    //   }
    // };

    // const submitHandler = async (event) => {
    //   event.preventDefault();
    //   try {
    //     const response = await axios.post('/http://localhost:3001/api/v1/user/signup', { email, password });
    //     // Handle successful login response
    //     navigate('/'); // or wherever you want to redirect
    //     toast.success(response.data.message)
    //   } catch (error) {
    //     // Handle login error
    //     toast.error(error.response.data.message);
    //   }
    // };
    return (
        <div>
            <div className="my-10">
                <Header />
                <div className="flex justify-center mx-auto max-w-7xl max-h-full">
                    <div></div>
                    <form
                        onSubmit={submitHandler}
                        className="w-full md:max-2xl:w-1/2 border border-gray-300 rounded-md px-8 py-6 my-10 "
                    >
                        <h1 className="font-bold text-xl mb-5 underline text-center">
                            SignUp
                        </h1>
                        <div className="my-4 flex flex-col gap-3">
                            <Label>Name</Label>
                            <Input
                                name="name"
                                placeholder="Name"
                                type="name"
                                value={input.name}
                                onChange={eventHandler}
                            />
                        </div>
                        <div className="my-4 flex flex-col gap-3">
                            <Label>Email</Label>
                            <Input
                                name="email"
                                placeholder="Email"
                                type="email"
                                value={input.email}
                                onChange={eventHandler}
                            />
                        </div>
                        <div className="my-4 flex flex-col gap-3">
                            <Label>Password</Label>
                            <Input
                                name="password"
                                placeholder="Password"
                                type="password"
                                value={input.password}
                                onChange={eventHandler}
                            />
                        </div>
                        <div className="my-4 flex flex-col gap-3">
                            <Label>Phone</Label>
                            <Input
                                name="phone"
                                placeholder="Phone"
                                type="Number"
                                value={input.phone}
                                onChange={eventHandler}
                            />
                        </div>
                        <div className="my-4">
                            <Button
                                className="bg-[#202020] text-white w-full"
                                type="submit"
                                variant="outline"
                            >
                                Signup
                            </Button>
                        </div>
                        <span className="text-sm ">
                            Already have an account?{" "}
                            <Link to="/login" className="text-[#202ef0]">
                                Login!
                            </Link>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
