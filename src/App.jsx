import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const ENDPOINT = 'https://two-server-simulation-server.vercel.app';
let socket;

const RaspberryPiClient = () => {
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.on('connect', () => {
      console.log('Connected to the Node.js server');
    });

    socket.on('sensor-data', (data) => {
      console.log('Received sensor data:', data);
      setSensorData(data);
    });

    socket.on('server-command', (data) => {
      console.log('Received command from server:', data);
      // Process the command and update the UI
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      {sensorData ? (
        <p>Sensor Value: {sensorData.sensor_value}</p>
      ) : (
        <p>Loading sensor data...</p>
      )}
    </div>
  );
};

export default RaspberryPiClient;
