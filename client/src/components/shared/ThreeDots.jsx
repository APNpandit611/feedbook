import React from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ThreeDots = ({ post }) => {
    const user = useSelector((store) => store.user.user);

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreVertical className="" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <Link to={`/post/detail/${post._id}`}>
                        <DropdownMenuItem className="cursor-pointer">
                            View
                        </DropdownMenuItem>
                    </Link>
                    {user._id === post.createdBy._id ? (
                        <>
                            <Link to={`/post/edit/${post._id}`}>
                                <DropdownMenuItem className="cursor-pointer">
                                    Edit
                                </DropdownMenuItem>
                            </Link>
                            <Link to={`/post/delete/${post._id}`}>
                                <DropdownMenuItem className="cursor-pointer">
                                    Delete
                                </DropdownMenuItem>
                            </Link>
                        </>
                    ) : null}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ThreeDots;
