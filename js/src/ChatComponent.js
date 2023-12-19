import React, { useState } from 'react';
import socketIOClient from 'socket.io-client';

// Establish connection
const socket = socketIOClient("https://flowiseai-railway-production-8568.up.railway.app/api/v1/prediction/4ba1c37f-f325-4a9e-b190-7bdb594201cf");

const ChatComponent = () => {
  // State for storing the client ID
  const [socketIOClientId, setSocketIOClientId] = useState('');

  // Listen to connection events
  socket.on('connect', () => {
    setSocketIOClientId(socket.id);
  });

  // Function to send query
  async function query(data) {
    const response = await fetch(
      "https://flowiseai-railway-production-8568.up.railway.app/api/v1/prediction/4ba1c37f-f325-4a9e-b190-7bdb594201cf",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const result = await response.json();
    return result;
  }

  // Example query
  query({
    "question": "Hey, how are you?",
    "socketIOClientId": socketIOClientId
  }).then((response) => {
    console.log(response);
  });

  // Listen to token stream
  socket.on('start', () => {
    console.log('start');
  });

  socket.on('token', (token) => {
    console.log('token:', token);
  });

  socket.on('sourceDocuments', (sourceDocuments) => {
    console.log('sourceDocuments:', sourceDocuments);
  });

  socket.on('end', () => {
    console.log('end');
  });

  // Disconnect connection
  const disconnectSocket = () => {
    socket.disconnect();
  }

  return (
    <div className="chat-container">
      <h2>Chat</h2>
      {/* Chat interface elements go here */}
      {/* You can add input fields, buttons, etc., styled with Bootstrap classes */}
      <button onClick={disconnectSocket} className="btn btn-danger">Disconnect</button>
    </div>
  );
}

export default ChatComponent;
