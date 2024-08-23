import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import axios from "axios";

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem("user"));

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
                                            <Button variant="link"></Button>
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
