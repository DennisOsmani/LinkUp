import { IUser } from "../interfaces/ModelInterfaces";
import { USER_PATH, URL_BASE } from "./UrlPaths";

const THIS_URL: string = `${URL_BASE}${USER_PATH}`;

// ADD TOKEN HERE
export async function SearchUsers(searchString: string) {
  try {
    const response = await fetch(
      `${THIS_URL}/user/search/?searchString=${searchString}`,
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

    const data: IUser[] = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// ADD TOKEN HERE
export async function getUser(userId?: string, token: string) {
  try {
    let urlPath;

    if (userId) {
      urlPath = `${THIS_URL}/?userId=${userId}`;
    } else {
      urlPath = `${THIS_URL}`;
    }

    const response = await fetch(urlPath, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error in response: " + response.status);
    }

    const data: IUser = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// ADD TOKEN HERE
export async function updateUser(user: IUser, token: string) {
  try {
    const response = await fetch(`${THIS_URL}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Error in response: " + response.status);
    }

    const data: IUser = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// ADD TOKEN HERE
export async function deleteUser(userId?: string, token: string) {
  try {
    let urlPath;

    if (userId) {
      urlPath = `${THIS_URL}/?userId=${userId}`;
    } else {
      urlPath = `${THIS_URL}`;
    }

    const response = await fetch(urlPath, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error in response: " + response.status);
    }

    return response.status;
  } catch (error) {
    console.log(error);
  }
}
