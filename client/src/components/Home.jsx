import React from "react";
import Navbar from "./shared/Navbar";
import UserPost from "./shared/UserPost";

const Home = () => {
    return (
        <div>
            <div className="">
                <Navbar />
                <UserPost />
            </div>
        </div>
    );
};

export default Home;
