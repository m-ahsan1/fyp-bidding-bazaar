import React, { useState, useContext, useEffect } from "react";
import { useFirestoreDocument } from "../hooks/useFirestoreDocument";
import { useParams } from "react-router-dom";
import Countdown from "react-countdown";
import ImageDisplay from "../components/imageDisplay";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import apiServerNode from "../apiServerNodeConfig";
import { useDispatch } from "react-redux";
import { deductToken } from "../redux/slices/userSlice";

const AuctionDetailPage = () => {
  const { id } = useParams();
  const {
    documentData: auctionData,
    loading,
    error,
  } = useFirestoreDocument("auctions", id);
  const { bidAuction, endAuction } = useContext(AuthContext);
  const [msg, setMsg] = useState(null);
  const [isCurrentUserWinner, setIsCurrentUserWinner] = useState(false);
  const [isCurrentUserSeller, setIsCurrentUserSeller] = useState(false);
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);
  const [isCountdownCompleted, setIsCountdownCompleted] = useState(false);
  const [personInfo, setPersonInfo] = useState(null);
  const [showPayToken, setShowPayToken] = useState(true);

  const dispatch = useDispatch();

  const handleDeductTokens = () => {
    const amountToDeduct = 10; // Example: Deduct 10 tokens
    const uid = auth.currentUser.uid;
    // console.log(uid);
    dispatch(deductToken({ uid, amountToDeduct }));
    setShowPayToken(false);
  };

  useEffect(() => {
    if (auctionData) {
      setIsCurrentUserWinner(
        auth.currentUser && auth.currentUser.email === curWinner
      );
      setIsCurrentUserSeller(
        auth.currentUser && auth.currentUser.email === email
      );
      setIsAuctionEnded(status === "ended");
    }
  }, [auctionData]);

  useEffect(() => {
    if (msg) {
      toast.error(msg, {
        position: toast.POSITION.TOP_CENTER,
      });
      setMsg(null); // Clear the message after showing the toast
    }
  }, [msg]);

  useEffect(() => {
    if (isCountdownCompleted && isAuctionEnded) {
      endAuction(id);
    }
  }, [isCountdownCompleted, endAuction, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!auctionData) return <div>No auction data found.</div>;

  const {
    title,
    description,
    images,
    email,
    manufacturer,
    modelYear,
    mileage,
    price,
    curPrice,
    nextPrice,
    curWinner,
    status,
    duration,
  } = auctionData;

  const temp = images.map((img) => img.imgUrl);

  const handleBid = () => {
    bidAuction(id, nextPrice);
  };

  const getPersonInfo = async () => {
    try {
      let email_temp = isCurrentUserWinner ? email : curWinner;
      const response = await apiServerNode.get(`/api/user/email/${email_temp}`);
      setPersonInfo(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start p-6 md:p-12 space-y-8 md:space-y-0 md:space-x-12 bg-gray-50 min-h-screen">
      <div className="w-full md:w-1/2">
        <ImageDisplay images={temp} />
      </div>
      <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-lg">
        <div className="space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
            {title}
          </h1>
          <p className="text-gray-600">{description}</p>
          <div className="space-y-2">
            <p className="text-gray-600">
              <strong>Manufacturer:</strong> {manufacturer}
            </p>
            <p className="text-gray-600">
              <strong>Model Year:</strong> {modelYear}
            </p>
            <p className="text-gray-600">
              <strong>Mileage:</strong> {mileage} km
            </p>
            <p className="text-gray-600">
              <strong>Starting Price:</strong> {price} PKR
            </p>
            {curPrice !== undefined && (
              <p className="text-gray-600">
                <strong>Current Bid:</strong> {curPrice} PKR
              </p>
            )}
            {isCurrentUserWinner ? (
              <p className="text-gray-600">
                <strong>You are the highest bidder</strong>
              </p>
            ) : isCurrentUserSeller && !isAuctionEnded ? (
              <button
                className="btn btn-primary"
                onClick={() => {
                  endAuction(id);
                }}
              >
                End Auction
              </button>
            ) : null}
          </div>
          <Countdown
            date={duration}
            onComplete={() => setIsCountdownCompleted(true)}
            renderer={({ days, hours, minutes, seconds, completed }) => {
              return (
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  {completed || isAuctionEnded ? (
                    <div className="text-gray-600 text-center">
                      <h2 className="text-3xl font-bold mb-4">
                        {isAuctionEnded
                          ? "Auction Ended"
                          : "Countdown Completed"}
                      </h2>
                      {isAuctionEnded && personInfo ? (
                        <div className="text-left">
                          <p className="font-bold">Contact Info:</p>
                          <p>Name: {personInfo.username}</p>
                          <p>Email: {personInfo.email}</p>
                          <p>Phone: {personInfo.phone}</p>
                        </div>
                      ) : (
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4 inline-block"
                          onClick={getPersonInfo}
                        >
                          {isCurrentUserWinner
                            ? "Contact Seller"
                            : isCurrentUserSeller
                              ? "Contact Buyer"
                              : null}
                        </button>
                      )}

                      {showPayToken && (
                        <button
                          onClick={handleDeductTokens}
                          className="bg-blue-400 rounded-lg hover:border border-black p-2 m-2 text-black"
                        >
                          Pay Token
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="text-gray-600 text-center">
                      <h2 className="text-3xl font-bold mb-4">
                        Auction Ends in:
                      </h2>
                      <div className="font-bold text-2xl mb-4">
                        {days} days, {hours} hours, {minutes} minutes, {seconds}{" "}
                        seconds
                      </div>
                      {!isCurrentUserWinner && !isCurrentUserSeller && (
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md inline-block"
                          onClick={handleBid}
                        >
                          Place Your Bid for ${nextPrice}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AuctionDetailPage;
