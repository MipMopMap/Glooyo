import { Firestore, deleteDoc, doc } from "firebase/firestore";
import { FirebaseStorage, deleteObject, ref } from "firebase/storage";

function useDeleteDocument(
  db: Firestore | null,
  storage: FirebaseStorage | null,
  data: any[],
  setData: React.Dispatch<React.SetStateAction<any[]>>
) {
  const handleDeleteDocument = async (documentId: string) => {
    if (!storage) return;
    const documentData = data.find((item) => item.id === documentId);
    const imageRef1 = ref(storage, documentData.imageURL1);
    const imageRef2 = ref(storage, documentData.imageURL2);

    try {
      if (!db) return;

      await deleteDoc(doc(db, "glooyaData", documentId));
      await Promise.all([deleteObject(imageRef1), deleteObject(imageRef2)]);
      console.log("Document and images successfully deleted.");
    } catch (error) {
      console.error("Error deleting document and images:", error);
    }
    setData((prevData) => prevData.filter((item) => item.id !== documentId));
  };

  return handleDeleteDocument;
}

export default useDeleteDocument;
