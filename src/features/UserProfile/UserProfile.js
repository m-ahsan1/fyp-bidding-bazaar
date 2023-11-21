import React, { useState } from 'react';
import tom from './tom.jpeg'
import { Navbar } from 'react-bootstrap';

const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    address: 'Fast University Lahore '
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
    // You can implement saving changes to a server or local storage here
    toggleEditMode();
  };

  return (
    <> 
    <Navbar />
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>

      {/* Image Section */}
      <div className="flex items-center justify-center mb-4">
        <img
          className="w-20 h-20 rounded-full object-cover"
          src={tom}  // Replace with the actual image source
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
              name="name"
              value={userData.name}
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
              value={userData.address}
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
            <strong>Name:</strong> {userData.name}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {userData.email}
          </p>
          <p className="mb-4">
            <strong>Phone:</strong> {userData.phone}
          </p>
          <p className="mb-4">
            <strong>Address:</strong> {userData.address}
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
    </>
  );
};

export default UserProfile;
