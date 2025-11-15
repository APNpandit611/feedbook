import React from "react";
import Navbar from "./shared/Navbar";
import UserPost from "./shared/UserPost";
import CreatePost from "./CreatePost";

const Home = () => {
    return (
        <div>
            <div className="">
                <Navbar />
                <div className="flex items-center justify-center mt-2">
                    <CreatePost />
                </div>
                <UserPost />
            </div>
        </div>
    );
};

export default Home;
