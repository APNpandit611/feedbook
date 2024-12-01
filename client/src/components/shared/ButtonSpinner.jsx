import React from "react";

const ButtonSpinner = () => {
    return (
        <div className="flex flex-col gap-3 items-center justify-center h-full mr-5 mt-3">
            <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-b-4 white-blue-500">
            </div>
           
        </div>
    );
};

export default ButtonSpinner;
