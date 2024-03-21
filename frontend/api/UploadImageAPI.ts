export const uploadImage = async (uri: string, token: string) => {
  try {
    if (uri === "EXIT") return;

    const blobResponse = await fetch(uri);
    const blob = await blobResponse.blob();

    const response = await fetch(`http://localhost:5173/api/upload`, {
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
