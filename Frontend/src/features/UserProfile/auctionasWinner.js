import React from "react";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import { setLoading } from "../../redux/slices/loadingSlice";
import { useDispatch } from "react-redux";
import { AuctionCard } from "../Auction/AuctionCard";
import { auth } from "../../firebase";

const AuctionsAsWinner = () => {
    const { docs, loading, error } = useFirestoreCollection("auctions");
    const dispatch = useDispatch();
    dispatch(setLoading(loading));
    if (loading) return <div></div>;

    const userAuctions = docs && docs.filter((doc) => doc.curWinner === auth.currentUser.email);
    const filteredEndedAuctions = userAuctions.filter((doc) => doc.status === "ended");
    const filteredActiveAuctions = userAuctions.filter((doc) => doc.status === "active");

    if (error) return <div>Error: {error.message}</div>;

    if (!userAuctions || userAuctions.length===0) return <div className="mt-8 text-center">No auctions found.</div>;
    return (
        <div className="mt-8">
            <h1 className="text-2xl font-bold mb-4">Your Auctions</h1>

            {filteredActiveAuctions.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">Active Auctions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredActiveAuctions.map((doc) => (
                            <AuctionCard key={doc.id} item={doc} />
                        ))}
                    </div>
                </div>
            )}

            {filteredEndedAuctions.length > 0 ? (
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">Ended Auctions</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredEndedAuctions.map((doc) => (
                            <AuctionCard key={doc.id} item={doc} />
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default AuctionsAsWinner;
