import { useState, useEffect } from "react";
import { firestoreApp, storageApp, serverTimestamp } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const useStorage = (data) => {
  console.log("useStorage: ", data);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(null);

  useEffect(() => {
    const collectionRef = collection(firestoreApp, "auctions");
    const promises = [];

    data.images.forEach((image) => {
      const storageRef = ref(storageApp, image.name);
      const uploadTask = uploadBytesResumable(storageRef, image);

      const promise = new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
          },
          (err) => {
            console.log(err);
            reject(err);
          },
          async () => {
            const imgUrl = await getDownloadURL(uploadTask.snapshot.ref);
            const createdAt = serverTimestamp();
            resolve({ ...image, url: imgUrl });
          }
        );
      });

      promises.push(promise);
    });

    Promise.all(promises)
      .then((uploadedImages) => {
        const imagesData = uploadedImages.map(({ url, ...rest }) => ({
          ...rest,
          imgUrl: url,
        }));
        const createdAt = serverTimestamp();
        delete data.images;
        addDoc(collectionRef, { ...data, createdAt, images: imagesData })
          .then(() => setIsCompleted(true))
          .catch((err) => {
            console.error("Error adding document: ", err);
            setIsCompleted(false);
          });
      })
      .catch((err) => {
        console.error("Error uploading images: ", err);
        setIsCompleted(false);
      });
  }, [data]);

  return { progress, isCompleted };
};

export default useStorage;
