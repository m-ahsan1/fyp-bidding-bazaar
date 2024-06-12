import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestoreApp } from "../firebase";

export const useFirestoreDocument = (collectionName, documentId) => {
    const [documentData, setDocumentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const docRef = doc(firestoreApp, collectionName, documentId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setDocumentData({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setError("No such document!");
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDocument();
    }, [collectionName, documentId]);

    return { documentData, loading, error };
};
