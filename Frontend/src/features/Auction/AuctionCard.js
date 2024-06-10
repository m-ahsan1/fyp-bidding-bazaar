import React, { useContext } from "react";
import Countdown from "react-countdown";
import { AuthContext } from "../../context/AuthContext";

import { auth } from "../../firebase";

const renderer = ({ days, hours, minutes, seconds, completed, props }) => {
  if (completed) {
    return null;
  }

  return (
    <div className="col">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div
          style={{
            height: "320px",
            backgroundImage: `url(${props.item.imgUrl})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          className="w-full"
        />

        <div className="p-4">
          <p className="text-xl font-semibold">{props.item.title}</p>
          <div className="flex justify-between items-center my-2">
            <h5 className="text-lg">
              {days * 24 + hours} hr: {minutes} min: {seconds} sec
            </h5>
          </div>
          <p className="text-gray-700">{props.item.desc}</p>
          <div className="flex justify-between items-center mt-4">
            <div>
              {!props.owner ? (
                <button
                  onClick={() => props.bidAuction()}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                >
                  Bid
                </button>
              ) : props.owner.email === props.item.email ? (
                <button
                  onClick={() => props.endAuction(props.item.id)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                >
                  Cancel Auction
                </button>
              ) : props.owner.email === props.item.curWinner ? (
                <p className="text-lg font-bold text-green-500">Winner</p>
              ) : (
                <button
                  onClick={() =>
                    props.bidAuction(props.item.id, props.item.curPrice)
                  }
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                >
                  Bid
                </button>
              )}
            </div>
            <p className="text-xl font-semibold">${props.item.curPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AuctionCard = ({ item }) => {
  const expiredDate = item.duration;
  const currentUser = auth.currentUser;
  const { bidAuction, endAuction } = useContext(AuthContext);

  return (
    <Countdown
      owner={currentUser}
      date={expiredDate}
      bidAuction={bidAuction}
      endAuction={endAuction}
      item={item}
      renderer={renderer}
    />
  );
};
