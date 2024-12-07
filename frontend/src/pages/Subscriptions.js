import React from 'react';

const Subscriptions = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="flex space-x-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="w-64 h-64 bg-gray-800 border-4 border-black rounded-2xl flex flex-col justify-between items-center text-white p-4 relative">
                        <div className="absolute top-4 right-4 bg-red-500 text-white py-1 px-3 text-sm font-bold rounded-lg">
                            20% OFF
                        </div>
                        <div className="flex-grow flex justify-center items-center">
                            <p>Subscription {index + 1}</p>
                        </div>
                        <div className="w-full bg-gray-700 p-2 rounded-lg text-center">
                            <p>Details about the subscription</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Subscriptions;
