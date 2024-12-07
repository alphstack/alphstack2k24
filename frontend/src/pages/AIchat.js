import React, { useState, useEffect, useRef } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { format } from 'date-fns';
import {Spinner} from "@nextui-org/react"

export const Loading = () => {
    return ( 
        <div 
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Ajustează opacitatea și culoarea overlay-ului după nevoi
                zIndex: 999,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Spinner size="lg" color="primary" />
        </div>
    );
}

const AIchat = () => {  
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const [newPrompt, setNewPrompt] = useState('');
  const [selectedDate, setSelectedDate] = useState('2024-12-07T13:24:49.711+00:00');
  const [conversations, setConversations] = useState([]);

  const getConversations = async () => {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API}/api/aichat/filterByDate`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: user.username, date: selectedDate }),
      });
      const json = await response.json();
      if (!response.ok) {
        console.log(json.error);
        setLoading(false);
      }
      if(response.ok){
        console.log(json.mesaje);
        setConversations(json.mesaje)
        setLoading(false);
      }
  }

  useEffect(() =>{
    console.log('test');
    if(user) getConversations();
  }, [selectedDate, user]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const sendNewMessage = async () =>{
    setLoading(true);
    const response = await fetch(`${process.env.REACT_APP_API}/api/aichat/sendNewMessage`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: user.username, prompt: newPrompt }),
    });
    const json = await response.json();
    if (!response.ok) {
      setLoading(false);
      console.log(json.error);
    }
    if(response.ok){
      console.log(json.message);
      setNewPrompt('');
      setSelectedDate(new Date());
      setLoading(false);
    }
  }

  const containerRef = useRef(null);

  useEffect(() => {
      if (containerRef.current && conversations.length > 0) {

          containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
  }, [conversations]);
  // const latestConversations = Object.keys(conversations).sort((a, b) => new Date(b) - new Date(a)).slice(0, 5);

  return (
    <div>
    <div className="flex h-[calc(100vh-96px)] bg-white text-black font-sans border border-gray-300 shadow-lg">
      <div className="w-48 bg-gray-200 p-5 border-r border-gray-300">
        <div className="mb-5">
          <h3 className="text-gray-700">Latest Conversations</h3>
          {/* {latestConversations.map(date => (
            <div key={date} className="p-2 mb-2 bg-gray-100 border-b border-gray-300 cursor-pointer text-gray-700" onClick={() => setSelectedDate(date)}>
              {conversations[date].subject}
            </div>
          ))} */}
        </div>
        <input type="date" className="w-full p-2 mb-5 border border-gray-300 rounded text-gray-700" onChange={handleDateChange} />
        {selectedDate && (
          <div className="p-2 mb-2 bg-gray-100 border-b border-gray-300 text-gray-700">
            The date you are currently viewing: <br />
            {format(selectedDate, 'dd-MM-yyyy')}
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between flex-1 p-5">
        {loading && <Loading />}
        <div className="flex-1 overflow-y-auto mb-5 p-2 bg-gray-100 rounded border border-gray-300" ref={containerRef} >
          {selectedDate && conversations ? (
            conversations.map((conv, index) => (
              <div key={index}>
                {conv.role === 'user' && 
                <div className="mb-2 text-black"><strong className="text-gray-700">User:</strong> {conv.content}</div>
                }
                {conv.role === 'assistant' && 
                <div className="mb-2 text-black"><strong className="text-green-500">AI:</strong> {conv.content}</div>
                }
              </div> 
            ))
          ) : (
            <div className="text-black">No conversation found for this date.</div>
          )}
          {conversations.length == 0 && <div className="text-black">No conversation found for this date.</div>}
        </div>
        <div className="flex items-center">
          <input type="text" className="flex-1 p-2 text-black border border-gray-300 rounded mr-2"
          value={newPrompt} onChange ={(e => setNewPrompt(e.target.value))} placeholder="Type a message..." />
          <button className="p-2 text-white bg-gray-700 rounded" onClick = {() => sendNewMessage()}>Send</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AIchat;