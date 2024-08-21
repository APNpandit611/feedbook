import React from "react";
import { TypeAnimation } from "react-type-animation";

const Header = () => {
    return (
        <div>
            <div className="text-center">
                <TypeAnimation
                    sequence={[
                        // Same substring at the start will only be typed out once, initially
                        "Welcome to the FeedBook's world.",
                        1000, // wait 1s before replacing "Mice" with "Hamsters"
                        "",
                        500,
                        
                    ]}
                    wrapper="span"
                    speed={50}
                    className="font-bold text-3xl"
                    repeat={Infinity}
                />
            </div>
        </div>
    );
};

export default Header;
