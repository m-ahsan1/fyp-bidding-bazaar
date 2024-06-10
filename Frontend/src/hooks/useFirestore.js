import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { firestoreApp } from "../firebase";

export const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestoreApp, collectionName),
      (snap) => {
        const documents = snap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setDocs(documents);
      }
    );

    return () => unsubscribe();
  }, [collectionName]);
  console.log(docs);
  return { docs };
};
