import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://two-server-simulation-server.vercel.app'); // Replace with your server URL

const App = () => {
  const [latestMessage, setLatestMessage] = useState('');

  console.log(latestMessage);

  useEffect(() => {
    
    // Listen for 'mqtt-data' events from the server
    socket.on('mqtt-data', (message) => {
      console.log('Received message:', message);
      setLatestMessage(message); // Update state with the latest message
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.off('mqtt-data');
    };
  }, []);

  return (
    <div>
      <h1>Real-Time Data</h1>
      <p>Latest Message: {latestMessage}</p>
    </div>
  );
};

export default App;
