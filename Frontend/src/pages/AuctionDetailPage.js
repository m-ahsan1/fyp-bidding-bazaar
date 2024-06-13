import React from "react";
import { useFirestoreDocument } from "../hooks/useFirestoreDocument";
import { useParams } from "react-router-dom";
import Countdown from "react-countdown";
import ImageDisplay from "../components/imageDisplay";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { useState, useContext } from "react";
import { toast } from "react-toastify";

const AuctionDetailPage = () => {
  const { id } = useParams();
  const {
    documentData: auctionData,
    loading,
    error,
  } = useFirestoreDocument("auctions", id);
  const { bidAuction, endAuction } = useContext(AuthContext);
  const [bidPrice, setBidPrice] = useState(0);
  const [msg, setMsg] = useState(null);

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
    curWinner,
    status,
    duration, // Assuming this is a timestamp
  } = auctionData;

  const isCurrentUserWinner =
    auth.currentUser && auth.currentUser.email === curWinner;
  const isCurrentUserSeller =
    auth.currentUser && auth.currentUser.email === email;
  const isAuctionEnded = status === "ended";

  const temp = images.map((img) => img.imgUrl);

  const handleBid = () => {
    if (!bidPrice) {
      setMsg("Please enter a valid bid price");
      return;
    }
    if (bidPrice <= curPrice) {
      setMsg("Please enter a bid price higher than the current price");
      return;
    }
    if (bidPrice <= price) {
      setMsg("Please enter a bid price higher than the starting price");
      return;
    }
    console.log(bidPrice);
    bidAuction(id, curPrice);
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start p-6 md:p-12 space-y-8 md:space-y-0 md:space-x-12 bg-gray-50 min-h-screen">
      {msg && toast.error(msg)}
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
                <strong>Current Price:</strong> ${curPrice}
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
            renderer={({ days, hours, minutes, seconds, completed }) => {
              return completed || isAuctionEnded ? (
                <div className="text-gray-600">
                  <strong>Auction Time Ended</strong>
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
                      <input
                        type="number"
                        className="border border-gray-300 px-3 py-2 rounded-md mr-2 focus:outline-none focus:border-blue-500"
                        placeholder="Enter your bid"
                        value={bidPrice}
                        onChange={(e) => setBidPrice(e.target.value)}
                      />
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                        onClick={handleBid}
                      >
                        Bid Now
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
