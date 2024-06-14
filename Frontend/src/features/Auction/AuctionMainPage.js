import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import { AddAuction } from "./AddAuction";
import { AuctionCard } from "./AuctionCard";
import { ProgressBar } from "./ProgressBar";
import { auth } from "../../firebase";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { setLoading } from "../../redux/slices/loadingSlice";
import { useDispatch } from "react-redux";

export const AuctionMainPage = () => {
  const [auction, setAuction] = useState(null);
  const { globalMsg } = useContext(AuthContext);
  const { docs, loading, error } = useFirestoreCollection("auctions");
  const [showEnded, setShowEnded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // State to handle search query
  const itemsPerPage = 6;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(loading));
  }, [loading, dispatch]);

  // Filter auctions based on status and search query
  const filteredAuctions =
    docs &&
    docs.filter((doc) => {
      const matchesSearchQuery = doc.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const isActiveOrEnded = showEnded
        ? doc.status === "ended" && doc.curWinner === auth.currentUser.email
        : doc.status === "active";
      return matchesSearchQuery && isActiveOrEnded;
    });

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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="py-5">
      <div className="container mx-auto px-4">
        {/* Search bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by car title..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Display auction cards */}
        {currentItems && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {currentItems.map((doc) => {
              return <AuctionCard item={doc} key={doc.id} />;
            })}
          </div>
        )}

        {/* Pagination buttons */}
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
