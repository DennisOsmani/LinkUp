import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../firebase";

export const uploadImage = async (uri: string | undefined): Promise<string> => {
  if (uri === undefined) {
    return "";
  }

  try {
    console.error("ALIVE 1");
    const response = await fetch(uri);

    console.error("ALIVE 2");
    const blob = await response.blob();

    const storageRef = ref(storage, `images/${uri}`);

    console.error("ALIVE 3");
    try {
      await uploadBytes(storageRef, blob); // Maybe here
    } catch (error) {
      throw new Error("Error uploading: " + error);
    }

    console.error("ALIVE 4");
    const imageURL = await getDownloadURL(storageRef);

    console.error("ALIVE 5");
    return imageURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
