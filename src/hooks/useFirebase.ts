import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import firebaseConfig from "../firebase-config.js";

interface FirebaseInstances {
  db: Firestore | null;
  storage: FirebaseStorage | null;
}

const useFirebase = (): FirebaseInstances => {
  const [instances, setInstances] = useState<FirebaseInstances>({
    db: null,
    storage: null,
  });

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const dbInstance = getFirestore(app);
    const storageInstance = getStorage(app);
    setInstances({ db: dbInstance, storage: storageInstance });

    // Clean up the Firebase app when the component unmounts
    return () => {
      setInstances({ db: null, storage: null });
    };
  }, []);

  return instances;
};

export default useFirebase;
