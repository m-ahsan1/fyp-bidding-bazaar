import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { auth } from '../../firebase';
import Chart from 'chart.js/auto';
import Subbar from '../../components/Subbar';

const UserProfile = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState({ pdfCount: 0, payCount: 0, carCount: 0 });
  const chartRef = useRef(null);


  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const pdfResponse = await axios.get(`http://localhost:3001/api/userAnalytics/pdf/${auth.currentUser.uid}`);
        const payResponse = await axios.get(`http://localhost:3001/api/userAnalytics/pay/${auth.currentUser.uid}`);
        const carResponse = await axios.get(`http://localhost:3001/api/userAnalytics/cars/${auth.currentUser.uid}`);
        setAnalytics({ pdfCount: pdfResponse.data.pdfCount, payCount: payResponse.data.payCount, carCount: carResponse.data.carCount });
        console.log(analytics);
      } catch (error) {
        console.error('Failed to fetch user analytics:', error);
      }
      setUserData({
        username: user?.username ?? '',
        email: user?.email ?? '',
        phone: user?.phone ?? '',
        currentAddress: user?.currentAddress ?? '',
        image: user?.image ?? '',
        uid: user?.uid ?? '',
      });
    };
    fetchAnalytics();
  }, []);

  useEffect(() => {
    const renderChart = () => {
      const canvas = chartRef.current;

      if (canvas) {
        const ctx = canvas.getContext('2d');

        if (ctx) {
          // Destroy the existing chart if it exists
          if (canvas.chart) {
            canvas.chart.destroy();
          }

          // Create a new chart
          canvas.chart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['PDF Count', 'Pay Count', 'Total User Cars'],
              datasets: [{
                label: 'Analytics',
                data: [analytics.pdfCount, analytics.payCount, analytics.carCount],
                backgroundColor: [
                  'rgba(75, 192, 192, 0.6)', // Teal
                  'rgba(255, 99, 132, 0.6)', // Red
                  'rgba(255, 206, 86, 0.6)', // Yellow
                ],
                borderColor: [
                  'rgba(75, 192, 192, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 2,
              }],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false, // Set to true if you want to maintain aspect ratio
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                },
                y: {
                  beginAtZero: true,
                  grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                  },
                },
              },
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                  labels: {
                    font: {
                      weight: 'bold',
                    },
                  },
                },
              },
              layout: {
                padding: {
                  top: 20,
                  bottom: 20,
                  left: 20,
                  right: 20,
                },
              },
              maxHeight: 300,
            },
          });
        } else {
          console.error('Unable to get 2D context for canvas');
        }
      } else {
        console.error('Canvas element not found');
      }
    };


    renderChart();

    // Cleanup: destroy the chart when the component unmounts
    return () => {
      const canvas = chartRef.current;
      if (canvas && canvas.chart) {
        canvas.chart.destroy();
      }
    };
  }, [analytics]);


  const sendToHome = () => {
    navigate('/', { replace: true });
  }
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    username: user?.username ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    currentAddress: user?.currentAddress ?? '',
    image: user?.image ?? '',
    uid: user?.uid ?? '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const saveChanges = () => {
    toggleEditMode();
    dispatch(updateUser(userData));
  };

  return (
    user ? (
      <>
        <Navbar />
        <Subbar />
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
          <h1 className="text-2xl font-bold mb-4">User Profile</h1>

          {/* Image Section */}
          <div className="flex items-center justify-center mb-4">
            <img
              className="w-20 h-20 rounded-full object-cover"
              src={userData.image}
              alt="https://via.placeholder.com/150"
            />
          </div>

          {/* User Information */}
          {editMode ? (
            <div>
              <label className="block mb-2">
                Name:
                <input
                  className="w-full border p-2"
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleInputChange}
                />
              </label>
              <label className="block mb-2">
                Email:
                <input
                  className="w-full border p-2"
                  type="text"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                />
              </label>
              <label className="block mb-2">
                Phone:
                <input
                  className="w-full border p-2"
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                />
              </label>
              <label className="block mb-2">
                Address:
                <input
                  className="w-full border p-2"
                  type="text"
                  name="Address"
                  value={userData.currentAddress}
                  onChange={handleInputChange}
                />
              </label>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={saveChanges}
              >
                Save Changes
              </button>
            </div>
          ) : (
            <div>
              <p className="mb-2">
                <strong>Name:</strong> {userData.username}
              </p>
              <p className="mb-2">
                <strong>Email:</strong> {userData.email}
              </p>
              <p className="mb-4">
                <strong>Phone:</strong> {userData.phone}
              </p>
              <p className="mb-4">
                <strong>Address:</strong> {userData.currentAddress}
              </p>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                onClick={toggleEditMode}
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md" style={{ height: '600px' }}>
          <h1 className="text-2xl font-bold mb-4">User Analytics</h1>
          <canvas ref={chartRef} width="200" height="300"></canvas>
        </div>

      </>
    ) : (
      <>
        {sendToHome()}
      </>
    )
  );
};

export default UserProfile;
