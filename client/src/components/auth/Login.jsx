import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import Header from "../shared/Header";
import { GoogleLogin, useGoogleLogin, googleLogout } from "@react-oauth/google";

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
    });const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            console.log("Token response:", tokenResponse);
            setUser(tokenResponse);
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        if (user?.access_token) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json',
                    },
                })
                .then((res) => {
                    setProfile(res.data);
                    // Save the Google user data to localStorage
                    localStorage.setItem('googleUser', JSON.stringify(res.data));
                    navigate("/home");
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    const logOut = () => {
        googleLogout();
        setProfile(null);
        localStorage.removeItem('googleUser');
    };
    

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
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (res.data.success) {
                localStorage.setItem("user", JSON.stringify(res.data.user));

                navigate("/home");
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
            <div className=" my-10">
                <Header />
                <div className="flex justify-center mx-auto max-w-7xl max-h-full">
                    <form
                        onSubmit={submitHandler}
                        className="w-1/2 border border-gray-300 rounded-md px-8 py-6 my-10"
                    >
                        <h1 className="font-bold text-xl mb-5 underline text-center">
                            Login
                        </h1>

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

                        <div className="my-4 ">
                            <Button
                                className="bg-[#202020] text-white w-full"
                                type="submit"
                                variant="outline"
                            >
                                Login
                            </Button>
                        </div>
                        <div className="my-4">
                            <Button
                                className="bg-[white] text-black w-full"
                                onClick={() => login()}
                                variant="outline"
                            >
                                Sign in with Google
                            </Button>
                        </div>
                        <span className="text-sm ">
                            Dont have an account?{" "}
                            <Link to="/signup" className="text-[#202ef0]">
                                Signup!
                            </Link>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
