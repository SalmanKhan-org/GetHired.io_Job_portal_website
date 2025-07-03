// components/Loader.jsx
import React from 'react';

const Loader = () => {
    return (
        <div className="absolute inset-0 flex justify-center items-center">
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-4 border-purple-200 border-b-transparent animate-spin"></div>
            </div>
        </div>
    );
};

export default Loader;
