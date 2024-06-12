import React, { useEffect, useState } from "react";
import apiServerNode from "../apiServerNodeConfig";
import BlogEditor from "../features/Blogs/WriteBlog";

function AnalyticsComponent() {
  const [serverStats, setServerStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('/api/analytics')
      .then((response) => response.json())
      .then((data) => {
        setServerStats(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false); // Set loading to false on error
      });
  }, []);

  const handleShowForm = () => {
      setShowForm(!showForm);
    };


  if (isLoading) {
    return <p>Loading server stats...</p>;
  }

  // Calculate CPU usage as an average of load averages
  const cpuUsage = ((serverStats.cpuUsage.reduce((acc, val) => acc + val, 0) / serverStats.cpuUsage.length) * 100).toFixed(2);

  // Calculate memory usage
  const totalMemoryMB = (serverStats.memoryUsage.totalMemory / (1024 * 1024)).toFixed(2);
  const freeMemoryMB = (serverStats.memoryUsage.freeMemory / (1024 * 1024)).toFixed(2);
  const usedMemoryMB = (totalMemoryMB - freeMemoryMB).toFixed(2);
  const memoryUsagePercentage = ((usedMemoryMB / totalMemoryMB) * 100).toFixed(2);




  return (
    <div>
      <h2>Server Resource Utilization</h2>
      <p>Active Users: {serverStats.activeUsers}</p>
      <p>CPU Usage: {cpuUsage}%</p>
      <p>Memory Usage: {memoryUsagePercentage}%</p>
      <p>Total Memory: {totalMemoryMB} MB</p>
      <p>Free Memory: {freeMemoryMB} MB</p>
      {/* Add additional visualizations or components based on your needs */}
    </div>
  );
}

export default AnalyticsComponent;
