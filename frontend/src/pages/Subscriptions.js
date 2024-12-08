import React, { useState } from 'react';
import cons2 from '../assets/cons15.png'; // Adjust the path to where your cons2.jpg is located
import cons3 from '../assets/cons10.png'; // Adjust the path to where your cons3.jpg is located
import { useAuthContext } from '../hooks/useAuthContext';

const SubscriptionBox = ({ index, discount, details, imageUrl, popupContent, isOpen, togglePopup }) => {
    const { user } = useAuthContext();

    const closePopup = (e) => {
        if (e.target.id === 'popup-overlay') {
            togglePopup(null);
        }
    };

    return (
        <div className="relative w-96 h-96 m-4 p-4 border-2 border-black shadow-lg flex flex-col justify-between" style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: '8px', // Make the borders rounder
        }}>
            {discount && (
                <div className={`absolute top-2 right-2 py-2 px-4 text-sm font-semibold rounded z-10 ${index === 0 ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                    {discount}
                </div>
            )}
            <div className="flex-grow flex justify-center items-center">
            </div>
            <div className="flex w-full space-x-2">
                <button onClick={() => togglePopup(index)} className={`w-${index === 1 ? '1/2' : 'full'} bg-black text-white border-2 border-black p-2 rounded-lg text-center transform transition-transform duration-150 ease-in-out hover:bg-gray-700`}>
                    Details
                </button>
                {index === 1 && (
                    <button className="w-1/2 bg-green-500 text-white border-2 border-black p-2 rounded-lg text-center transform transition-transform duration-150 ease-in-out hover:bg-green-700">
                        <span className="line-through">$1.50</span> $0.99
                    </button>
                )}
            </div>
            {isOpen && (
                <div id="popup-overlay" className="absolute inset-0 bg-white bg-opacity-50 flex justify-center items-center z-20 transition-opacity duration-300 ease-in-out" onClick={closePopup}>
                    <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform scale-95 duration-300 ease-in-out animate-popup" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-lg font-semibold mb-2">Subscription Details</h2>
                        <ul className="list-disc list-inside">
                            {popupContent.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                        {index === 0 && user && (
                            <p className="text-gray-500 text-xs mt-2">You are currently using this plan</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const Subscriptions = () => {
    const [openPopupIndex, setOpenPopupIndex] = useState(null);

    const freeContent = [
        "3 tasks per day",
        "Contains ads",
        "5 AI chat requests per day"
    ];

    const premiumContent = [
        "5 tasks per day",
        "No ads",
        "Unlimited AI chat requests"
    ];

    const togglePopup = (index) => {
        setOpenPopupIndex(openPopupIndex === index ? null : index);
    };

    return (
        <div className="flex flex-col justify-center items-center bg-gray-100" style={{ height: 'calc(100vh - 96px)' }}>
            <div className="flex space-x-8">
                <SubscriptionBox
                    index={0}
                    discount="FREE"
                    details="Details"
                    imageUrl={cons2}
                    popupContent={freeContent}
                    isOpen={openPopupIndex === 0}
                    togglePopup={togglePopup}
                />
                <SubscriptionBox
                    index={1}
                    discount="33% OFF"
                    details="Details"
                    imageUrl={cons3}
                    popupContent={premiumContent}
                    isOpen={openPopupIndex === 1}
                    togglePopup={togglePopup}
                />
            </div>
        </div>
    );
};

export default Subscriptions;