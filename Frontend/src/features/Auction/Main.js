import { useFirestore } from "../../hooks/useFirestore";
import { AddAuction } from "./AddAuction";
import { AuctionCard } from "./AuctionCard";
import { ProgressBar } from "./ProgressBar";
import { auth } from "../../firebase";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

export const Main = () => {
  const [auction, setAuction] = useState(null);
  const { globalMsg } = useContext(AuthContext);
  const { docs } = useFirestore("auctions");
  const [showEnded, setShowEnded] = useState(false); // State to track whether to show ended auctions
  console.log(docs);
  // Filter active or ended auctions based on the showEnded state
  const filteredAuctions =
    docs &&
    docs.filter((doc) =>
      showEnded
        ? doc.status === "ended" && doc.curWinner === auth.currentUser.email
        : doc.status === "active"
    );

  return (
    <div className="py-5">
      <div className="container mx-auto px-4">
        {auction && <ProgressBar auction={auction} setAuction={setAuction} />}
        {auth.currentUser && <AddAuction setAuction={setAuction} />}
        {globalMsg && toast.success(globalMsg)}

        <div className="flex justify-center mt-4">
          {/* Button to toggle between active and ended auctions */}
          <button
            onClick={() => setShowEnded(!showEnded)}
            className="btn btn-primary"
          >
            {showEnded ? "Show Active Auctions" : "Show Your auctions"}
          </button>
        </div>
        {filteredAuctions && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {filteredAuctions.map((doc) => {
              return <AuctionCard item={doc} key={doc.id} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};
