import { URL_BASE } from "./UrlPaths";
import { IMAGE_PATH } from "./UrlPaths";

const THIS_URL: string = `${URL_BASE}${IMAGE_PATH}`;

export const uploadImage = async (uri: string, token: string) => {
  try {
    if (uri === "EXIT") return;

    const blobResponse = await fetch(uri);
    const blob = await blobResponse.blob();

    const response = await fetch(`${THIS_URL}`, {
      method: "POST",
      body: blob,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error in uploadImage response: " + response.status);
    }

    const data: string = await response.text();
    return data;
  } catch (error) {
    throw new Error("Error while fetchig in uploadImage " + error);
  }
};
