import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // Replace with your public server's URL

const App = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Listen for messages from the server
        socket.on('message', (msg) => {
            console.log('Message from server: ' + msg);
            setMessages((prevMessages) => [...prevMessages, msg]);
            setMessage(msg);
        });

        // Clean up the socket connection on component unmount
        return () => {
            socket.off('message');
        };
    }, []);

    return (
        <div>
            <h1>Real-Time Messages</h1>
            <p>{message}</p>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
