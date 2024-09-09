// App.js
import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const App = () => {
    const [randomValue, setRandomValue] = useState(null);
    const endpoint = 'https://two-server-simulation-server.vercel.app'; // Replace with your cloud server URL

    useEffect(() => {
        const socket = socketIOClient(endpoint);

        socket.on('randomValue', (value) => {
            setRandomValue(value);
        });

        return () => {
            socket.disconnect();
        };
    }, [endpoint]);

    return (
        <div>
            <h4>Random Value from Server2: {randomValue}</h4>
        </div>
    );
};

export default App;
