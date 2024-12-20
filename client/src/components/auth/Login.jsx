import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import Header from "../shared/Header";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { login } from "../../store/userSlice"


const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const handleGoogleLogin = async (response) => {
    //     const idToken = response.credential;
    //     const decoded = jwtDecode(idToken);
    //     console.log(decoded);
    //     try {
    //         const res = await axios.post(`${USER_API_END_POINT}/googleLogin`, {
    //             idToken,
    //         });

    //         console.log(decoded.email);
    //         if (res.data.success) {
    //             localStorage.setItem("user", JSON.stringify(res.data.user));
    //             // navigate("/home");
    //             toast.success(res.data.message);
    //             console.log(res.data);
    //         }
    //     } catch (error) {
    //         toast.error(error.response.data.message);
    //         console.log(error);
    //     }
    // };

    // const login = useGoogleLogin({
    //     onSuccess: (tokenResponse) => {
    //         console.log("Token response:", tokenResponse);
    //         setUser(tokenResponse);
    //     },
    //     onError: (error) => console.log('Login Failed:', error)
    // });

    // useEffect(() => {
    //     if (user?.access_token) {
    //         axios
    //             .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
    //                 headers: {
    //                     Authorization: `Bearer ${user.access_token}`,
    //                     Accept: 'application/json',
    //                 },
    //             })
    //             .then((res) => {
    //                 setProfile(res.data);
    //                 // Save the Google user data to localStorage
    //                 localStorage.setItem('googleUser', JSON.stringify(res.data));
    //                 navigate("/home");
    //             })
    //             .catch((err) => console.log(err));
    //     }
    // }, [user]);

    // const logOut = () => {
    //     googleLogout();
    //     setProfile(null);
    //     localStorage.removeItem('googleUser');
    // };

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
                // localStorage.setItem("user", JSON.stringify(res.data.user));
                // localStorage.setItem("mode", "API_ROUTE");
                dispatch(login({user:res.data.user, mode:"APP"}))
                toast.success(res.data.message);
                navigate("/home");
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        }
    };

    const googleLoginSuccess = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const accessToken = tokenResponse.access_token;
                // Fetch the user info from Google
                const response = await fetch(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                const userInfo = await response.json();
 
                const res = await axios.post(
                    `${USER_API_END_POINT}/googleLogin`,
                    userInfo,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                );
                if (res.data.success) {
                    dispatch(login({user:res.data.user, mode:"GOOGLE"}))
                    navigate("/home");
                    toast.success(res.data.message);
                }
            } catch (error) {
                toast.error(error.response.data.message);
                console.log(error.response.data.message);
            }
        },
    });

    // const googleLoginSuccess = async (credentialResponse) => {
    //     const { credential } = credentialResponse;
    //     try {
    //         const res = await axios.post(
    //             `${USER_API_END_POINT}/googleLogin`,
    //             { token: credential },
    //             {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 withCredentials: true,
    //             }
    //         );

    //         if (res.data.success) {
    //             localStorage.setItem("user", JSON.stringify(res.data.user));
    //             localStorage.setItem("mode", "GOOGLE");
    //             navigate("/home");
    //             toast.success(res.data.message);
    //         }
    //     } catch (error) {
    //         toast.error(error.response.data.message);
    //         console.log(error.response.data.message);
    //     }
    // };

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
                <div className="flex justify-center max-h-full">
                    <form
                        onSubmit={submitHandler}
                        className="w-full md:max-2xl:w-1/2 border border-gray-300 rounded-md px-8 py-6 my-10 mx-10"
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
                        
                        <span className="text-sm ">
                            Dont have an account?{" "}
                            <Link to="/signup" className="text-[#202ef0]">
                                Signup!
                            </Link>
                        </span>
                        
                        <div className="my-4">
                            <Button
                                className="bg-[#202020] text-white w-full"
                                onClick={()=>googleLoginSuccess()}
                                variant="outline"
                                type="button"
                            >
                                <FcGoogle className="mx-2"/>
                                Sign in with Google
                            </Button>
                        </div>
                    </form>
                    

                    {/* <div className="my-4">
                        <GoogleLogin
                            onSuccess={(credentialResponse) => {
                                googleLoginSuccess(credentialResponse);
                            }}
                            onError={() => {
                                toast.error("login failed");
                                console.log("Login Failed");
                            }}
                        />
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Login;
