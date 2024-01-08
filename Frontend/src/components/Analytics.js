import React, { useState, useEffect } from 'react';

function AnalyticsComponent() {
  const [serverStats, setServerStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/analytics')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched data:', data); // Log the fetched data
        setServerStats(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Fetch error:', error); // Log any fetch errors
        setIsLoading(false); // Set loading to false on error
      });
  }, []);

  if (isLoading) {
    return <p>Loading server stats...</p>;
  }

  // Check if serverStats.cpuUsage is an array and has elements
  if (!Array.isArray(serverStats.cpuUsage) || serverStats.cpuUsage.length === 0) {
    return <p>No CPU usage data available.</p>;
  }

  // Calculate CPU usage as an average of load averages
  //const cpuUsage = (
  //  (serverStats.cpuUsage.reduce((acc, val) => acc + val, 0) / serverStats.cpuUsage.length) * 100
  //).toFixed(2);

  // Calculate memory usage
  const totalMemoryMB = (serverStats.memoryUsage.totalMemory / (1024 )).toFixed(2);
  const freeMemoryMB = (serverStats.memoryUsage.freeMemory / (1024)).toFixed(2);
  const usedMemoryMB = (totalMemoryMB - freeMemoryMB).toFixed(2);
  const memoryUsagePercentage = ((usedMemoryMB / totalMemoryMB) * 100).toFixed(2);

  return (
    <div>
      <h2>Server Resource Utilization</h2>
      <p>Active Users: {serverStats.activeUsers}</p>
      {/*<p>CPU Usage: {cpuUsage}%</p>*/}
      <p>Memory Usage: {memoryUsagePercentage}%</p>
      <p>Total Memory: {totalMemoryMB} MB</p>
      <p>Free Memory: {freeMemoryMB} MB</p>
      {/* Add additional visualizations or components based on your needs */}
    </div>
  );
}

export default AnalyticsComponent;
