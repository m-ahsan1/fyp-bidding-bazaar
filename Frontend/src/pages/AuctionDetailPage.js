import React, { useState, useContext, useEffect } from "react";
import { useFirestoreDocument } from "../hooks/useFirestoreDocument";
import { useParams } from "react-router-dom";
import Countdown from "react-countdown";
import ImageDisplay from "../components/imageDisplay";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const AuctionDetailPage = () => {
  const { id } = useParams();
  const { documentData: auctionData, loading, error } = useFirestoreDocument("auctions", id);
  const { bidAuction, endAuction } = useContext(AuthContext);
  const [msg, setMsg] = useState(null);
  const [isCurrentUserWinner, setIsCurrentUserWinner] = useState(false);
  const [isCurrentUserSeller, setIsCurrentUserSeller] = useState(false);
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);
  const [isCountdownCompleted, setIsCountdownCompleted] = useState(false);

  useEffect(() => {
    if (auctionData) {
      setIsCurrentUserWinner(
        auth.currentUser && auth.currentUser.email === auctionData.curWinner
      );
      setIsCurrentUserSeller(
        auth.currentUser && auth.currentUser.email === auctionData.email
      );
      setIsAuctionEnded(auctionData.status === "ended");
    }
  }, [auctionData]);

  useEffect(() => {
    if (msg) {
      toast.error(msg);
      setMsg(null); // Clear the message after showing the toast
    }
  }, [msg]);

  useEffect(() => {
    if (isCountdownCompleted) {
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
              <strong>Starting Price:</strong> ${price}
            </p>
            {curPrice !== undefined && (
              <p className="text-gray-600">
                <strong>Current Bid:</strong> ${curPrice}
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
              return completed || isAuctionEnded ? (
                <div className="text-gray-600">
                  <strong>Auction Ended</strong>
                </div>
              ) : (
                <>
                  <div className="text-gray-600">
                    <strong>Auction Ends in:</strong>
                    <span className="font-bold ml-2">
                      {days} days, {hours} hours, {minutes} minutes, {seconds}{" "}
                      seconds
                    </span>
                  </div>
                  {!isCurrentUserWinner && !isCurrentUserSeller && (
                    <div className="mt-4">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                        onClick={handleBid}
                      >
                        Place Your Bid for ${nextPrice}
                      </button>
                    </div>
                  )}
                </>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AuctionDetailPage;
