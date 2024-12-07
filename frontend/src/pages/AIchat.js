import React, { useState } from 'react';

const AIchat = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [conversations, setConversations] = useState({
    '2023-10-01': {
      subject: 'General Inquiry',
      messages: [
        { user: 'Hello, how are you?', ai: "I'm good, thank you! How can I assist you today?" },
        { user: 'Can you tell me a joke?', ai: "Sure! Why don't scientists trust atoms? Because they make up everything!" },
      ],
    },
    '2023-10-02': {
      subject: 'Weather Update',
      messages: [
        { user: 'What is the weather today?', ai: 'The weather is sunny with a high of 25°C.' },
      ],
    },
    // Add more conversations as needed
  });

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const latestConversations = Object.keys(conversations).sort((a, b) => new Date(b) - new Date(a)).slice(0, 5);

  return (
    <div className="flex h-[calc(100vh-96px)] bg-white text-black font-sans border border-gray-300 shadow-lg">
      <div className="w-48 bg-gray-200 p-5 border-r border-gray-300">
        <div className="mb-5">
          <h3 className="text-gray-700">Latest Conversations</h3>
          {latestConversations.map(date => (
            <div key={date} className="p-2 mb-2 bg-gray-100 border-b border-gray-300 cursor-pointer text-gray-700" onClick={() => setSelectedDate(date)}>
              {conversations[date].subject}
            </div>
          ))}
        </div>
        <input type="date" className="w-full p-2 mb-5 border border-gray-300 rounded text-gray-700" onChange={handleDateChange} />
        {selectedDate && (
          <div className="p-2 mb-2 bg-gray-100 border-b border-gray-300 text-gray-700">
            The date you are currently viewing: <br />
            {selectedDate}
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between flex-1 p-5">
        <div className="flex-1 overflow-y-auto mb-5 p-2 bg-gray-100 rounded border border-gray-300">
          {selectedDate && conversations[selectedDate] ? (
            conversations[selectedDate].messages.map((conv, index) => (
              <div key={index}>
                <div className="mb-2 text-black"><strong className="text-gray-700">User:</strong> {conv.user}</div>
                <div className="mb-2 text-black"><strong className="text-green-500">AI:</strong> {conv.ai}</div>
              </div>
            ))
          ) : (
            <div className="text-black">No conversation found for this date.</div>
          )}
        </div>
        <div className="flex items-center">
          <input type="text" className="flex-1 p-2 text-black border border-gray-300 rounded mr-2" placeholder="Type a message..." />
          <button className="p-2 text-white bg-gray-700 rounded">Send</button>
        </div>
      </div>
    </div>
  );
};

export default AIchat;