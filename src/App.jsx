import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('https://two-server-simulation-server.vercel.app', {
  transports: ['websocket', 'polling'],
});
function App() {
    const [command, setCommand] = useState('');
    const [randomValue, setRandomValue] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('https://two-server-simulation-server.vercel.app/command', { command });
            alert('Command sent to server1');
        } catch (error) {
            console.error('Error sending command:', error);
        }
    };


    useEffect(() => {
      socket.on('connect', () => {
          console.log('Connected to server');
      });

      socket.on('randomValue', (value) => {
          setRandomValue(value);
          console.log('Received random value:', value);
      });
      

      // const fetchRandomValue = async () => {
      //     try {
      //         const response = await axios.get('https://two-server-simulation-server.vercel.app/random');
      //         setRandomValue(response.data); // Update state with the received random value
      //         console.log('Received random value:', response.data);
      //     } catch (error) {
      //         console.error('Error fetching random value:', error);
      //     }
      // };

      //   // Fetch random value every second
      //   const intervalRandomValue = setInterval(fetchRandomValue, 1000);

      //   // Cleanup interval on component unmount
      //   return () => clearInterval(intervalRandomValue);
    }, []); 

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    placeholder="Enter command"
                />
                <button type="submit">Send Command</button>
            </form>
            <div>
                <h2>Random Value: {randomValue}</h2>
            </div>
        </div>
    );
}

export default App;
