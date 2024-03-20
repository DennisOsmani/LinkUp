export const uploadImage = async (blob: Blob, token: string) => {
  try {
    const response = await fetch(`http://localhost:5173/api/upload`, {
      method: "POST",
      body: blob,
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
