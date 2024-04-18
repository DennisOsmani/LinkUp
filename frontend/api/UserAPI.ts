import { IUser } from "../interfaces/ModelInterfaces";
import { USER_PATH, URL_BASE } from "./UrlPaths";

const THIS_URL: string = `${URL_BASE}${USER_PATH}`;

export async function SearchUsers(searchString: string, token: string) {
  try {
    const response = await fetch(
      `${THIS_URL}/search/?searchString=${searchString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error in SearchUsers response: " + response.status);
    }

    const data: IUser[] = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error while fetching in SearchUsers  " + error);
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
      throw new Error("Error in getUser response: " + response.status);
    }

    const data: IUser = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error while fetching in getUser " + error);
  }
}

export async function GetUserFriends(token: string, userId?: string) {
  try {
    const response = await fetch(`${THIS_URL}/friends`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error in getUserFriends response: " + response.status);
    }

    const data: IUser[] = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error while fetching in getUserFriends " + error);
  }
}

export async function GetPendingFriendRequests(token: string, userId?: string) {
  try {
    const response = await fetch(`${THIS_URL}/pending`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        "Error in getPendingFriendRequests response: " + response.status
      );
    }

    const data: IUser[] = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      "Error while fetching in getPendingFriendRequests " + error
    );
  }
}

export async function GetUserFriendRequests(token: string, userId?: string) {
  try {
    const response = await fetch(`${THIS_URL}/request`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        "Error in GetUserFriendRequests response: " + response.status
      );
    }

    const data: IUser[] = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error while fetching in GetUserFriendRequests " + error);
  }
}

export async function GetUserBlocks(token: string, userId?: string) {
  try {
    const response = await fetch(`${THIS_URL}/blocked`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error in GetUserBlocks response: " + response.status);
    }

    const data: IUser[] = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error while fetching in GetUserBlocks " + error);
  }
}

export async function UpdateUser(user: IUser, token: string) {
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
      throw new Error("Error in updateUser response: " + response.status);
    }

    const data: IUser = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error while fetching in updateUser " + error);
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
      throw new Error("Error in deleteUser response: " + response.status);
    }

    return response.status;
  } catch (error) {
    throw new Error("Error while fetching in deleteUser " + error);
  }
}
