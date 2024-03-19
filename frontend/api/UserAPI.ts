import { IUser } from "../interfaces/ModelInterfaces";
import { USER_PATH, URL_BASE } from "./UrlPaths";

const THIS_URL: string = `${URL_BASE}${USER_PATH}`;

export async function SearchUsers(searchString: string, token: string) {
  try {
    const response = await fetch(
      `${THIS_URL}/user/search/?searchString=${searchString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

export async function getUser(token: string, userId?: string) {
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
        Authorization: `Bearer ${token}`,
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

export async function updateUser(user: IUser, token: string) {
  try {
    const response = await fetch(`${THIS_URL}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

export async function deleteUser(token: string, userId?: string) {
  try {
    let urlPath;

    if (userId) {
      urlPath = `${THIS_URL}/delete/?userId=${userId}`;
    } else {
      urlPath = `${THIS_URL}/delete`;
    }

    const response = await fetch(urlPath, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
