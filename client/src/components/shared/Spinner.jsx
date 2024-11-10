import React from "react";

const Spinner = () => {
    return (
        <div className="flex flex-col gap-3 items-center justify-center h-full my-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500">  </div>
            <div>Loading ...</div>
        </div>
    );
};

export default Spinner;
