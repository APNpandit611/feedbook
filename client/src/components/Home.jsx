import React from "react";
import Navbar from "./shared/Navbar";
import UserPost from "./shared/UserPost";
import CreatePost from "./CreatePost";

const Home = () => {
    return (
        <div>
            <div className="">
                <Navbar />
                <CreatePost/>
                <UserPost />
            </div>
        </div>
    );
};

export default Home;
