import React, { useContext, useState, useEffect } from "react";
import Countdown from "react-countdown";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

export const AuctionCard = ({ item }) => {
  const expiredDate = item.duration;
  const currentUser = auth.currentUser;
  const { bidAuction, endAuction } = useContext(AuthContext);
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isCompleted && item.status !=="ended") {
      endAuction(item.id);
    }
  }, [isCompleted, endAuction, item.id]);

  const renderer = ({ days, hours, minutes, seconds, completed, props }) => {
    const onClickNavigate = () => {
      navigate(`/auction/${props.item.id}`);
    };

    return (
      <div className="col" onClick={onClickNavigate}>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div
            style={{
              height: "320px",
              backgroundImage: `url(${props.item.images[0].imgUrl})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            className="w-full cursor-pointer"
          />
          <div className="p-4">
            <p className="text-xl font-semibold">{props.item.title}</p>
            <p className="text-gray-700 mb-2">{props.item.description}</p>
            <div className="flex justify-between items-center mt-4">
              <p className="text-lg font-semibold">
                {completed ? "Auction Ended" : `Auction ends in: ${days * 24 + hours} hr ${minutes} min ${seconds} sec`}
              </p>
              <p className="text-xl font-semibold">${props.item.price}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Countdown
      owner={currentUser}
      date={expiredDate}
      bidAuction={bidAuction}
      endAuction={endAuction}
      item={item}
      onComplete={() => setIsCompleted(true)}
      renderer={renderer}
    />
  );
};
