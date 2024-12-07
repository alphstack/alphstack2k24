import React from 'react';

const SubscriptionBox = ({ index, discount, details }) => {
    return (
        <div className="w-80 h-80 bg-gray-800 border-4 border-black rounded-2xl flex flex-col justify-between items-center text-white p-4 relative">
            <div className="absolute top-4 right-4 bg-red-500 text-white py-1 px-3 text-sm font-bold rounded-lg">
                {discount}
            </div>
            <div className="flex-grow flex justify-center items-center">
                {/* Space for animation or photo */}
            </div>
            <div className="w-full bg-gray-700 p-2 rounded-lg text-center">
                <p>{details}</p>
            </div>
        </div>
    );
};

const Subscriptions = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="flex space-x-4">
                <SubscriptionBox index={0} discount="20% OFF" details="Details about the subscription 1" />
                <SubscriptionBox index={1} discount="15% OFF" details="Details about the subscription 2" />
                <SubscriptionBox index={2} discount="10% OFF" details="Details about the subscription 3" />
            </div>
        </div>
    );
};

export default Subscriptions;