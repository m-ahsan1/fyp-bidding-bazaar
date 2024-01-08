import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogEditor from "../features/Blogs/WriteBlog";

function AnalyticsComponent() {
  const [serverStats, setServerStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/analytics')
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

  const handleShowForm = () => {
    setShowForm(!showForm);
  };


  return (
    <div>
      <h2>Server Resource Utilization</h2>
      <p>Active Users: {serverStats.activeUsers}</p>
      <p>CPU Usage: {cpuUsage}%</p>
      <p>Memory Usage: {memoryUsagePercentage}%</p>
      <p>Total Memory: {totalMemoryMB} MB</p>
      <p>Free Memory: {freeMemoryMB} MB</p>
      {/* Add additional visualizations or components based on your needs */}

      <br></br>
      <hr></hr>
      <br></br>
      <center>
      <div>
        <button
          onClick={handleShowForm}
          className="bg-black text-white rounded-2xl w-[150px] h-[35px]"
        >
          Write a Blog
        </button>
        <br></br>
        {showForm && <BlogEditor setShowForm={setShowForm} />}
      </div>
      </center>

    </div>
  );
}

export default AnalyticsComponent;
