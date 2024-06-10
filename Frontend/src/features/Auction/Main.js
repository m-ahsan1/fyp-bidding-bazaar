import { useFirestore } from "../../hooks/useFirestore";
import { AddAuction } from "./AddAuction";
import { AuctionCard } from "./AuctionCard";
import { ProgressBar } from "./ProgressBar";
import { auth } from "../../firebase";
import { useState } from "react";
export const Main = () => {
  const [auction, setAuction] = useState(null);
  const { docs } = useFirestore("auctions");
  console.log(docs);

  return (
    <div className="py-5">
      <div className="container mx-auto px-4">
        {auction && <ProgressBar auction={auction} setAuction={setAuction} />}
        {auth.currentUser && <AddAuction setAuction={setAuction} />}

        {docs && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {docs.map((doc) => {
              return <AuctionCard item={doc} key={doc.id} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};
