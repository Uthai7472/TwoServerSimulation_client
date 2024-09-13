import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ENDPOINT = 'https://two-server-simulation-server.vercel.app';

const SensorDataDisplay = () => {
  const [sensorData1, setSensorData1] = useState(null);
  const [sensorData2, setSensorData2] = useState(null);
  const [sensorData3, setSensorData3] = useState(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(`${ENDPOINT}/api/data`);
        console.log('Received sensor data:', response.data.sensor_value1);
        setSensorData1(response.data.sensor_value1);
        setSensorData2(response.data.sensor_value2);
        setSensorData3(response.data.sensor_value3);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {sensorData1 ? (
        <div>
          <p>Sensor1 Value: {sensorData1}</p>
          <p>Sensor2 Value: {sensorData2}</p>
          <p>Sensor3 Value: {sensorData3}</p>
        </div>
      ) : (
        <p>Loading sensor data...</p>
      )}
    </div>
  );
};

export default SensorDataDisplay;
