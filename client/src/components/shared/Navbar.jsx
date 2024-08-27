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

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate()

    const logoutHandler = async(e) => {
        e.preventDefault();

        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (res.data.success) {
                localStorage.removeItem('user');
                navigate("/")
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("An error occurred during logout. Please try again.");
        }
    }

    return (
        <div>
            <div className="border-b-2 border-indigo-500 flex item-center justify-between px-7 py-4">
                <div className="text-2xl font-bold">Feedbook</div>
                <div>
                    <div>
                        <ul className="flex items-center gap-9 font-medium">
                            <Link to="/">
                                <li>Home</li>
                            </Link>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage
                                            src="https://github.com/shadcn.png"
                                            alt="@shadcn"
                                        />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div className="flex items-center gap-3 space-y-1">
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage
                                                src="https://github.com/shadcn.png"
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

                                    <div className="my-3 mx-1">
                                        <div className="flex items-center">
                                            <User2 />
                                            <Button variant="link">
                                                View Profile
                                            </Button>
                                        </div>
                                        <div className="flex items-center">
                                            <LogOut />
                                            <Button variant="link" onClick={logoutHandler}>Logout</Button>
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
