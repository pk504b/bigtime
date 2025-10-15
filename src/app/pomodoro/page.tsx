"use client";


// components/Stopwatch.js
import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false); // Whether the stopwatch is running or not
  const [timeElapsed, setTimeElapsed] = useState(0); // Time in milliseconds
  const [lapTimes, setLapTimes] = useState([]); // Array to store collected lap times

  // Format the current elapsed time using Luxon (HH:mm:ss:SSS format)
  const formattedTime = DateTime.fromMillis(timeElapsed).toFormat('mm:ss:SSS');

  useEffect(() => {
    let timer;

    // Start the timer when the stopwatch is running
    if (isRunning) {
      const startTime = Date.now() - timeElapsed; // Synchronize the start time

      timer = setInterval(() => {
        setTimeElapsed(Date.now() - startTime); // Continuously update the elapsed time
      }, 10); // Update every 10ms
    } else {
      clearInterval(timer); // Stop the timer when it's not running
    }

    return () => clearInterval(timer); // Clean up interval when component is unmounted
  }, [isRunning, timeElapsed]);

  // Function to start/stop the stopwatch
  const toggleStopwatch = () => {
    setIsRunning(prev => !prev);
  };

  // Function to reset the stopwatch
  const resetStopwatch = () => {
    setIsRunning(false);
    setTimeElapsed(0);
    setLapTimes([]); // Clear collected lap times
  };

  // Function to collect a timestamp (lap time)
  const collectLapTime = () => {
    setLapTimes(prevLaps => [...prevLaps, formattedTime]);
  };

  return (
    <div style={styles.container}>
      <h1>Stopwatch</h1>
      <div style={styles.timeDisplay}>{formattedTime}</div>
      
      <div style={styles.buttons}>
        <button onClick={toggleStopwatch} style={styles.button}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={resetStopwatch} style={styles.button}>Reset</button>
      </div>
      
      <button onClick={collectLapTime} style={styles.lapButton} disabled={!isRunning}>
        Collect Lap Time
      </button>

      <div style={styles.lapList}>
        <h3>Collected Lap Times:</h3>
        <ul>
          {lapTimes.map((lap, index) => (
            <li key={index}>{lap}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Some simple styles for the stopwatch
const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    border: '2px solid #333',
    borderRadius: '10px',
    maxWidth: '300px',
    margin: 'auto',
    backgroundColor: '#f9f9f9',
  },
  timeDisplay: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: '20px 0',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  lapButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '15px',
  },
  lapList: {
    marginTop: '20px',
    textAlign: 'left',
    maxHeight: '200px',
    overflowY: 'scroll',
  }
};

export default Stopwatch;
