import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://two-server-simulation-server.vercel.app');

const DataDisplay = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        socket.on('update', (newData) => {
            setData(newData);
        });

        return () => {
            socket.off('update');
        };
    }, []);

    return (
        <div>
            <h1>Data from Raspberry Pi:</h1>
            {data ? <p>{JSON.stringify(data)}</p> : <p>No data received yet.</p>}
        </div>
    );
};

export default DataDisplay;
