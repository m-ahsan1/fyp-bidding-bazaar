import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, getUserData, updateUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import apiServerNode from "../../apiServerNodeConfig";
import { auth } from "../../firebase";
import Listing from "../Listing/Listing";
import AuctionsAsOwner from "./auctionasOwner";
import AuctionsAsWinner from "./auctionasWinner";

const UserProfile = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userListings, setUserListings] = useState([]);
  const [showListings, setShowListings] = useState(false);
  const [showAuctionsasOwner, setShowAuctionsasOwner] = useState(false);
  const [showAuctionsasWinner, setShowAuctionsasWinner] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
    currentAddress: "",
    image: "",
    uid: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && auth.currentUser && auth.currentUser.uid) {
          // Fetch user data if user is not already available
          await dispatch(getUserData(auth.currentUser.uid));


          const response = await apiServerNode.get(
            `/api/listings/user/${auth.currentUser.uid}`
          );
          setUserListings(response.data);
        } else {
          navigate(-1)
        }
      } catch (error) {
        console.error("Failed to fetch user data or listings:", error);
      }
    };

    fetchData();
  }, [dispatch, user]);

  useEffect(() => {
    // Initialize userData state once user data is available
    if (user) {
      setUserData({
        username: user.username ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        currentAddress: user.currentAddress ?? "",
        image: user.image ?? "",
        uid: user.uid ?? "",
      });
    }
  }, [user]);

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

  if (!user) {
    // If user is not yet loaded, return null or a loading indicator
    navigate(-1)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-center mb-8">
              <img
                className="w-24 h-24 rounded-full object-cover"
                src={userData.image || "https://via.placeholder.com/150"}
                alt="Profile"
              />
            </div>
            {editMode ? (
              <div>
                <label className="block mb-2">
                  Name:
                  <input
                    className="w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleInputChange}
                  />
                </label>
                <label className="block mb-2">
                  Email:
                  <input
                    className="w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                  />
                </label>
                <label className="block mb-2">
                  Phone:
                  <input
                    className="w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                  />
                </label>
                <label className="block mb-2">
                  Address:
                  <input
                    className="w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="currentAddress"
                    value={userData.currentAddress}
                    onChange={handleInputChange}
                  />
                </label>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4 mr-2"
                  onClick={saveChanges}
                >
                  Save Changes
                </button>
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 mt-4"
                  onClick={toggleEditMode}
                >
                  Cancel
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
                <p className="mb-4">
                  <strong>Token:</strong> {user?.token || 0}{" "}
                </p>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  onClick={toggleEditMode}
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 text-center">
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-4 ${showListings ? 'bg-blue-700' : ''}`}
          onClick={() => setShowListings(!showListings)}
        >
          {showListings ? 'Hide Your Listings' : 'Show Your Listings'}
        </button>
        {showListings && userListings.length !== 0 && (
          <div className="my-10">
            <h1 className="text-2xl font-bold mb-6 text-center">Your Listings</h1>
            <div className="flex flex-wrap gap-10 justify-around">
              {userListings.map((item) => (
                <div key={item._id}>
                  <Listing {...item} id={item._id} />
                </div>
              ))}
            </div>
          </div>
        )}
        {showListings && userListings.length === 0 && (
          <h1 className="text-2xl font-bold text-center">You have no listings</h1>
        )}
      </div>
      <div className="max-w-4xl mx-auto mt-8 text-center">
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full ${showAuctionsasOwner ? 'bg-blue-600' : ''}`}
          onClick={() => setShowAuctionsasOwner(!showAuctionsasOwner)}
        >
          {showAuctionsasOwner ? 'Hide Your Auctions' : 'Show Your Auctions'}
        </button>
        {showAuctionsasOwner && <AuctionsAsOwner />}
      </div>
      <div className="max-w-4xl mx-auto mt-8 text-center">
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full ${showAuctionsasWinner ? 'bg-blue-600' : ''}`}
          onClick={() => setShowAuctionsasWinner(!showAuctionsasWinner)}
        >
          {showAuctionsasWinner ? 'Hide these' : 'Show Auctions You are Winning'}
        </button>
        {showAuctionsasWinner && <AuctionsAsWinner />}
      </div>
    </div>
  );
};

export default UserProfile;
