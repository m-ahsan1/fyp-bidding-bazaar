import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { auth } from '../../firebase';
import Listing from '../Listing/Listing';

const UserProfile = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    async function getUserListings() {
      try {
        await axios.get(`http://localhost:3001/api/listings/user/${auth.currentUser.uid}`).then((response) => {
          // console.log(response.data, response.data.length);
          if (response.data.length === 0) {
            return;
          }
          // response.data.forEach((listing) => {
          //   userListings.push(listing);
          // });
          setUserListings(response.data);
          console.log(userListings, userListings.length);
        });
      }
      catch (error) {
        console.error('Failed to fetch user listings:', error);
      }
    }
    getUserListings();
  }, []);

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
        <h1 className="text-2xl text-center font-bold mb-4">Your Profile</h1>
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">

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
                  name="currentAddress"
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
        {userListings.length !== 0 ? (
          <div className='my-10'>
            {console.log(userListings)}
            <h1 className="text-2xl font-bold mb-10 text-center">Your Listings</h1>
            <div className="flex flex-wrap gap-10 justify-around" style={{ paddingLeft: "2%", paddingRight: "2%" }}>
              {userListings.map((item) => (
                <div key={item._id}>
                  <Listing
                    id={item._id}
                    images={item.images}
                    title={item.title}
                    price={item.price}
                    engine={item.engine}
                    mileage={item.mileage}
                    modelYear={item.modelYear}
                    description={item.description}
                    company={item.company}
                    currentBid={item.currentBid}
                    uid={item.uid}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <h1 className="text-2xl font-bold text-center">You have no listings</h1>
        )}
      </>
    ) : (
      <>
        {sendToHome()}
      </>
    )
  );
};

export default UserProfile;
