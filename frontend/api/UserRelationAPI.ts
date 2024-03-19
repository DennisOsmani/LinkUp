import { URL_BASE, USERRELATION_PATH } from "./UrlPaths";

const THIS_URL: string = `${URL_BASE}${USERRELATION_PATH}`;

const createUserRelation = async (token: string) => {
  try {
    const response = await fetch(`${THIS_URL}/`, {
      method: "XXXXXXXXXXX",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        "Error in createUserRelation response: " + response.status
      );
    }

    const data: XXXXXXXXXX = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching createUserRelation " + error);
  }
};

const updateUserRelationType = async (token: string) => {
  try {
    const response = await fetch(`${THIS_URL}/`, {
      method: "XXXXXXXXXXX",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        "Error in updateUserRelationType response: " + response.status
      );
    }

    const data: XXXXXXXXXX = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching updateUserRelationType " + error);
  }
};

const deleteUserRelation = async (token: string) => {
  try {
    const response = await fetch(`${THIS_URL}/`, {
      method: "XXXXXXXXXXX",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        "Error in deleteUserRelation response: " + response.status
      );
    }

    const data: XXXXXXXXXX = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching deleteUserRelation " + error);
  }
};
