import React from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";

const ThreeDots = ({ postId }) => {
    
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreVertical className="" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <Link to={`/post/detail/${postId}`}>
                        <DropdownMenuItem className="cursor-pointer">
                            View
                        </DropdownMenuItem>
                    </Link>
                    <Link>
                        <DropdownMenuItem className="cursor-pointer">
                            Edit
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem className="cursor-pointer">
                        Team
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                        Subscription
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ThreeDots;
