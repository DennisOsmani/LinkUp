import { User } from "../interfaces/ModelInterfaces";

const BASE_URL: string = "http://localhost:5173/api";

export async function SearchUsers(searchString: string) {
  try {
    const response = await fetch(
      `${BASE_URL}/user/search/?searchString=${searchString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error in response: " + response.status);
    }
    const data: User[] = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
