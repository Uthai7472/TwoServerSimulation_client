import React, { useEffect, useState } from 'react'
import axios from 'axios';

const App = () => {
  const [deviceId, setDeviceId] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [command, setCommand] = useState('');
  const [status, setStatus] = useState('');

  const [monitorValues, setMonitorValues] = useState([]);

  const registerDevice = async () => {
    try {
      await axios.post('https://two-server-simulation-server.vercel.app/api/devices/register', {
        deviceId, deviceName, deviceType
      });
      alert('Device registered successfully');
    } catch (error) {
      alert(`Error: ${error.response.data.error}`);
    }
  }

  const controlDevice = async () => {
    try {
      const response = await axios.post(`https://two-server-simulation-server.vercel.app/api/devices/${deviceId}/control`, {
        command
      });

      alert(response.data.message);

    } catch (error) {
      alert(`Error: ${error.response.data.error}`);
    }
  }

  useEffect(() => {
    const fetchMonitorValue = async () => {
      try {
          const response = await axios.get(`https://two-server-simulation-server.vercel.app/api/devices/1234/monitor`);
          if (response.data && response.data.values) {
              setMonitorValues(response.data.values);
          } else {
              console.error('No values found in response:', response.data);
          }
      } catch (error) {
          console.error('Error fetching monitor values:', error);
      }
    };
  

    const intervalId = setInterval(fetchMonitorValue, 1000);
  
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Device Control</h1>
      <h3>Register Device</h3>
      <input 
        type="text" 
        value={deviceId}
        onChange={(e) => setDeviceId(e.target.value)}
        placeholder='Device ID'
      />
      <input 
        type="text" 
        value={deviceName}
        onChange={(e) => setDeviceName(e.target.value)}
        placeholder='Device Name'
      />
      <input 
        type="text" 
        value={deviceType}
        onChange={(e) => setDeviceType(e.target.value)}
        placeholder='Device Type'
      />
      <button onClick={registerDevice}>
        Register
      </button>

      <h3>Send Command</h3>
      <input 
        type="text" 
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder='Command'
      />
      <button onClick={controlDevice}>
        Send Command
      </button>

      <h3>{monitorValues[1]}</h3>
    </div>
  )
}

export default App