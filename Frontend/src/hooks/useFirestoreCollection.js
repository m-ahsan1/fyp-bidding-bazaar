import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { firestoreApp } from "../firebase";

export const useFirestoreCollection = (collectionName) => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestoreApp, collectionName),
      (snap) => {
        setLoading(true); // Set loading state to true when fetching
        setError(null); // Clear any previous error

        const documents = snap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setDocs(documents);
        setLoading(false); // Set loading state to false after fetching
      },
      (err) => {
        setError(err); // Set error state if there's an error
        setLoading(false); // Set loading state to false on error
      }
    );

    return () => unsubscribe();
  }, [collectionName]);

  return { docs, loading, error };
};
