import React, { useState, useEffect } from 'react';

function AnalyticsComponent() {
  const [serverStats, setServerStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/analytics')
      .then((response) => response.json())
      .then((data) => {
        setServerStats(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (isLoading) {
    return <p>Loading server stats...</p>;
  }

  return (
    <div>
      <h2>Server Resource Utilization</h2>
      <p>Active Users: {serverStats.activeUsers}</p>
      <p>CPU Usage: {serverStats.cpuUsage[0].toFixed(2)}%</p>
      <p>Memory Usage: {Math.round((serverStats.memoryUsage.used / serverStats.memoryUsage.total) * 100)}%</p>
      <p>Total Memory: {serverStats.memoryUsage.total / 1024 / 1024} MB</p>
      <p>Free Memory: {serverStats.memoryUsage.free / 1024 / 1024} MB</p>
      {/* Add additional visualizations or components based on your needs */}
    </div>
  );
}

export default AnalyticsComponent;
