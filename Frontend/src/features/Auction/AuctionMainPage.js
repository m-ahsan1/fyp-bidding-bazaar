import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import { AddAuction } from "./AddAuction";
import { AuctionCard } from "./AuctionCard";
import { ProgressBar } from "./ProgressBar";
import { auth } from "../../firebase";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { setLoading } from "../../redux/slices/loadingSlice";
import { useDispatch } from "react-redux";

export const AuctionMainPage = () => {
  const [auction, setAuction] = useState(null);
  const { globalMsg } = useContext(AuthContext);
  const { docs, loading, error } = useFirestoreCollection("auctions");
  const [showEnded, setShowEnded] = useState(false); // State to track whether to show ended auctions
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const dispatch = useDispatch();

  // Filter active or ended auctions based on the showEnded state
  const filteredAuctions =
    docs &&
    docs.filter((doc) =>
      showEnded
        ? doc.status === "ended" && doc.curWinner === auth.currentUser.email
        : doc.status === "active"
    );

  // Calculate pagination details
  const totalPages = Math.ceil(filteredAuctions.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentItems = filteredAuctions.slice(startIdx, endIdx);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  dispatch(setLoading(loading));

  if (loading) return <div></div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="py-5">
      <div className="container mx-auto px-4">
        {/* {auction && <ProgressBar auction={auction} setAuction={setAuction} />}
        {auth.currentUser && <AddAuction setAuction={setAuction} />} */}
        {globalMsg &&
          toast.success(globalMsg, {
            position: toast.POSITION.TOP_CENTER,
          })}

        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowEnded(!showEnded)}
            className="btn btn-primary"
          >
            {showEnded ? "Show Active Auctions" : "Show Your Auctions"}
          </button>
        </div>

        {currentItems && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {currentItems.map((doc) => {
              return <AuctionCard item={doc} key={doc.id} />;
            })}
          </div>
        )}

        <div className="flex justify-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="btn btn-secondary mx-2"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="btn btn-secondary mx-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
