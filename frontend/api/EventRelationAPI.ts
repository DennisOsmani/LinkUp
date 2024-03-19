import { URL_BASE, EVENTRELATION_PATH } from "./UrlPaths";

const THIS_URL: string = `${URL_BASE}${EVENTRELATION_PATH}`;

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
      throw new Error("Error in response: " + response.status);
    }

    const data: XXXXXXXXXX = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching getEventsInCity: " + error);
  }
};
