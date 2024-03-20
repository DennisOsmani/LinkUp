import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../api/UploadImageAPI";

/**
 * KANSKJE ENDRE
 *
 * Ikke laste opp bilde til azure før man lager event.
 * Bruk lokal uri til å vise bilde.
 * Kall på handleChooseAndUploadImage når event skal opprettes.
 */

export async function handleChooseAndUploadImage() {
  try {
    const result = await pickImage();

    if (result === "EXIT") return;
    const response = await fetch(result.assets[0].uri);
    const blob = await response.blob();

    const imageURL = await uploadImage(blob, "TOKEN_NEED_HERE_LOL");
    console.log("DET FUNGERER NÅÅÅÅ HAHAHA LOL");
    return imageURL;
  } catch (error) {
    console.log("Error while handling image upload and choosing", error);
  }
}

const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    aspect: [4, 3],
    quality: 0,
  });

  if (!result.canceled) {
    return result;
  } else {
    return "EXIT";
  }
};
