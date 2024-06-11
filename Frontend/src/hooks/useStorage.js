import { useState, useEffect } from "react";
import { firestoreApp, storageApp, serverTimestamp } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const useStorage = (data) => {
  console.log("useStorage: ", data);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(null);

  useEffect(() => {
    const storageRef = ref(storageApp, data.itemImage.name);
    const collectionRef = collection(firestoreApp, "auctions");

    const uploadTask = uploadBytesResumable(storageRef, data.itemImage);

    uploadTask.on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        console.log(err);
      },
      async () => {
        const imgUrl = await getDownloadURL(uploadTask.snapshot.ref);
        const createdAt = serverTimestamp();
        delete data.itemImage;
        await addDoc(collectionRef, { ...data, createdAt, imgUrl });
        setIsCompleted(true);
      }
    );
  }, [data]);

  return { progress, isCompleted };
};

export default useStorage;
