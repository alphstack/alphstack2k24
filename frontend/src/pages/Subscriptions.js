import React from 'react';

const Subscriptions = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="flex space-x-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="relative w-64 h-64 bg-black border-2 border-black rounded-lg flex flex-col justify-end p-4">
                        <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden">
                            <div className="absolute top-0 left-0 w-32 h-32 bg-red-500 transform rotate-45 origin-bottom-right"></div>
                        </div>
                        <div className="text-white text-center mt-auto">
                            <p>Subscription {index + 1}</p>
                            <p>Details about the subscription</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Subscriptions;