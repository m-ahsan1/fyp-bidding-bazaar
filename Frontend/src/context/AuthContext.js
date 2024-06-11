import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { firestoreApp, auth } from "../firebase"; // Assuming firestoreApp initializes the Firestore app

// Create context for authentication
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [globalMsg, setGlobalMsg] = useState("");

  // Function to bid on an auction
  const bidAuction = async (auctionId, price) => {
    if (!currentUser) {
      setGlobalMsg("Please login first");
      return;
    }

    let newPrice = Math.floor((price / 100) * 110);

    try {
      // Correct document path with two segments: "auctions" and the auctionId
      const auctionRef = doc(firestoreApp, "auctions", auctionId);
      await updateDoc(auctionRef, {
        curPrice: newPrice,
        curWinner: currentUser.email,
      });
      setGlobalMsg("Bid placed successfully");
    } catch (error) {
      console.error("Error updating document: ", error);
      setGlobalMsg("Error placing bid");
    }
  };

  // Function to end an auction
  const endAuction = async (auctionId) => {
    try {
      // Correct document path with even segments
      const auctionRef = doc(firestoreApp, "auctions", auctionId);
      await deleteDoc(auctionRef);
      setGlobalMsg("Auction ended successfully");
    } catch (error) {
      console.error("Error deleting document: ", error);
      setGlobalMsg("Error ending auction");
    }
  };

  useEffect(() => {
    // Set up the authentication state observer
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    // Clear global message after 5 seconds
    const interval = setTimeout(() => setGlobalMsg(""), 5000);
    return () => clearTimeout(interval);
  }, [globalMsg]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        bidAuction,
        endAuction,
        globalMsg,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
