import React from 'react';

const NotFound = () => {
    return (
        <>
            <div className="flex flex-col justify-center items-center bg-gray-100">
                <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-xl text-gray-700 mb-8">Page Not Found</p>
                <a href="/" className="text-blue-500 hover:underline text-lg">
                    Go Back Home
                </a>
            </div>
        </>
    );
};

export default NotFound;
