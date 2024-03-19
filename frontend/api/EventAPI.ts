import { IEvent } from "../interfaces/ModelInterfaces";
import { URL_BASE, EVENT_PATH } from "./UrlPaths";

const THIS_URL: string = `${URL_BASE}${EVENT_PATH}`;

// LEGG INN TOKEN HER!
const getEventById = async (eventId: number, token: string) => {
  try {
    const response = await fetch(`${THIS_URL}/${eventId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error in response: " + response.status);
    }

    const data: Event = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching getEventsInCity: " + error);
  }
};

// LEGG INN TOKEN HER!
const getEventsInCity = async (city: string, token: string) => {
  try {
    const response = await fetch(`${THIS_URL}/city${city}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error in response: " + response.status);
    }

    const data: Event[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching getEventsInCity: " + error);
  }
};

// LEGG INN TOKEN HER!
export const getUserFriendEvents = async (eventId: number, token: string) => {
  try {
    const response = await fetch(`${THIS_URL}/${eventId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error in response: " + response.status);
    }

    const data: IEvent[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching getEventsInCity: " + error);
  }
};

// LEGG INN TOKEN HER!
export const getUserEventInvites = async (token: string) => {
  try {
    const response = await fetch(`${THIS_URL}/city/{city}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error in response: " + response.status);
    }

    const data: IEvent[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching getEventsInCity: " + error);
  }
};

// LEGG INN TOKEN HER!
export const getUserJoinedEvents = async (token: string) => {
  try {
    const response = await fetch(`${THIS_URL}/friends`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error in response: " + response.status);
    }

    const data: IEvent[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching getEventsInCity: " + error);
  }
};

// LEGG INN TOKEN HER!
export const createEvent = async (event: Event, token: string) => {
  try {
    const response = await fetch(`${THIS_URL}/friends`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error in response: " + response.status);
    }

    return response.status;
  } catch (error) {
    console.error("Error while fetching getEventsInCity: " + error);
  }
};

// LEGG INN TOKEN HER!
export const updateEvent = async (event: Event, token: string) => {
  try {
    const response = await fetch(`${THIS_URL}/friends`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error in response: " + response.status);
    }

    return response.status;
  } catch (error) {
    console.error("Error while fetching getEventsInCity: " + error);
  }
};

// LEGG INN TOKEN HER!
export const deleteEvent = async (eventId: number, token: string) => {
  try {
    const response = await fetch(`${THIS_URL}/${eventId}`, {
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
    console.error("Error while fetching getEventsInCity: " + error);
  }
};
