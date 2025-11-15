import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { googleLogout } from "@react-oauth/google";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/userSlice";

const Navbar = () => {
    // const user = JSON.parse(localStorage.getItem('user'));
    // const user = JSON.parse(localStorage.getItem("user"));
    const user = useSelector((store)=>store.user.user)
    const mode = useSelector((store)=>store.user.mode)

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const logoutHandler = async (e) => {
        e.preventDefault();
        try {
            if (mode === "GOOGLE") {
                googleLogout();
                // localStorage.removeItem("mode");
                navigate("/");
                toast.success("logged out successfully");
            } else {
                const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
                // localStorage.removeItem("user");
                navigate("/");
                toast.success(res.data.message);
            }
            // if (res.data.success) {
            //     localStorage.removeItem("user");
            //     navigate("/");
            //     toast.success(res.data.message);
            // }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred during logout. Please try again.");
        } finally {
            dispatch(logout())
        }
    };

    return (
        <div>
            <div className="border-b-2 border-indigo-500 flex item-center justify-between px-7 py-4">
                <div className="text-2xl font-bold">Feedbook</div>
                <SearchBar />

                <div>
                    <div>
                        <ul className="flex items-center gap-9 font-medium">
                            <Link to="/home">
                                <li className="hidden md:block">Home</li>
                            </Link>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage
                                            src={user.picture ?? "https://github.com/shadcn.png"}
                                            alt="@shadcn"
                                        />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div className="flex items-center gap-3 space-y-1 p-3">
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage
                                                src={user.picture ?? "https://github.com/shadcn.png"}
                                                alt="@shadcn"
                                            />
                                        </Avatar>

                                        <div>
                                            <h4 className="font-medium">
                                                {user.name}
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                                {user.bio}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="my-3 mx-3">
                                        <div className="flex items-center">
                                            <User2 />
                                            <Button variant="link">
                                                View Profile
                                            </Button>
                                        </div>
                                        <div className="flex items-center">
                                            <LogOut />
                                            <Button
                                                variant="link"
                                                onClick={logoutHandler}
                                            >
                                                Logout
                                            </Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
