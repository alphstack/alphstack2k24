import React from 'react';

const SubscriptionBox = ({ index, discount, details }) => {
    return (
        <div className="w-80 h-80 bg-gray-800 border border-gray-700 rounded-lg flex flex-col justify-between items-center text-white p-4 relative">
            <div className="absolute top-2 right-2 bg-red-500 text-white py-1 px-2 text-xs font-semibold rounded">
                {discount}
            </div>
            <div className="flex-grow flex justify-center items-center">
                {/* Space for animation or photo */}
            </div>
            <button className="w-full bg-gray-700 p-2 rounded text-center transform transition-transform duration-150 ease-in-out hover:bg-gray-600">
                {details}
            </button>
        </div>
    );
};

const Subscriptions = () => {
    return (
        <div className="flex flex-col justify-center items-center bg-gray-100" style={{ height: 'calc(100vh - 96px)' }}>
            <div className="flex space-x-8">
                <SubscriptionBox index={0} discount="20% OFF" details="Details about the subscription 1" />
                <SubscriptionBox index={1} discount="15% OFF" details="Details about the subscription 2" />
                <SubscriptionBox index={2} discount="10% OFF" details="Details about the subscription 3" />
            </div>
        </div>
    );
};

export default Subscriptions;