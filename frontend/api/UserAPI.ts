const BASE_URL: string = "http://localhost:5173/api";

export async function SearchUsers(searchString: string) {
  try {
    const response = await fetch(`${BASE_URL}/user/search`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error in response: " + response.status);
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
