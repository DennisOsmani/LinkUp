import { URL_BASE, EVENTRELATION_PATH } from "./UrlPaths";

const THIS_URL: string = `${URL_BASE}${EVENTRELATION_PATH}`;

/*
const x = async (token: string) => {
  try {
    const response = await fetch(`${THIS_URL}/`, {
      method: "XXXXXXXXXXX",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error in x response: " + response.status);
    }

    const data: XXXXXXXXXX = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching x " + error);
  }
};

const x = async (token: string) => {
  try {
    const response = await fetch(`${THIS_URL}/`, {
      method: "XXXXXXXXXXX",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
*/

export const joinOpenEvent = async (token: string, eventId: number) => {
  try {
    const response = await fetch(`${THIS_URL}/join?eventId=${eventId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error in joinOpenEvent response: " + response.status);
    }

    return response.status;
  } catch (error) {
    console.error("Error while joining open event " + error);
  }
};

/*
const x = async (token: string) => {
  try {
    const response = await fetch(`${THIS_URL}/`, {
      method: "XXXXXXXXXXX",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error in x response: " + response.status);
    }

    const data: XXXXXXXXXX = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching x " + error);
  }
};

const x = async (token: string) => {
  try {
    const response = await fetch(`${THIS_URL}/`, {
      method: "XXXXXXXXXXX",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error in x response: " + response.status);
    }

    const data: XXXXXXXXXX = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching x " + error);
  }
};

const x = async (token: string) => {
  try {
    const response = await fetch(`${THIS_URL}/`, {
      method: "XXXXXXXXXXX",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error in x response: " + response.status);
    }

    const data: XXXXXXXXXX = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching x " + error);
  }
};
*/

