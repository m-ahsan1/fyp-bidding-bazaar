import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { firestoreApp } from "../firebase";

export const useFirestoreDocument = (collectionName, documentId) => {
    const [documentData, setDocumentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const docRef = doc(firestoreApp, collectionName, documentId);
        const unsubscribe = onSnapshot(
            docRef,
            (docSnap) => {
                if (docSnap.exists()) {
                    setDocumentData({ id: docSnap.id, ...docSnap.data() });
                    setLoading(false);
                } else {
                    setError("No such document!");
                    setLoading(false);
                }
            },
            (err) => {
                setError(err.message);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [collectionName, documentId]);

    return { documentData, loading, error };
};
