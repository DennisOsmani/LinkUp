import { IEvent } from "../interfaces/ModelInterfaces";
import { URL_BASE, EVENT_PATH } from "./UrlPaths";

const THIS_URL: string = `${URL_BASE}${EVENT_PATH}`;

const getEventById = async (eventId: number, token: string) => {
  try {
    const response = await fetch(`${THIS_URL}/${eventId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

const getEventsInCity = async (city: string, token: string) => {
  try {
    const response = await fetch(`${THIS_URL}/city${city}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

export const getUserFriendEvents = async (token: string) => {
  try {
    const response = await fetch(`${THIS_URL}/friends`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

export const getUserEventInvites = async (token: string) => {
  try {
    const response = await fetch(`${THIS_URL}/invites`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

export const getUserJoinedEvents = async (token: string) => {
  try {
    const response = await fetch(`${THIS_URL}/joined`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

export const createEvent = async (event: Event, token: string) => {
  try {
    const response = await fetch(`${THIS_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      throw new Error("Error in response: " + response.status);
    }

    return response.status;
  } catch (error) {
    console.error("Error while fetching getEventsInCity: " + error);
  }
};

export const updateEvent = async (event: Event, token: string) => {
  try {
    const response = await fetch(`${THIS_URL}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      throw new Error("Error in response: " + response.status);
    }

    const data: IEvent = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching getEventsInCity: " + error);
  }
};

export const deleteEvent = async (eventId: number, token: string) => {
  try {
    const response = await fetch(`${THIS_URL}/${eventId}`, {
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
    console.error("Error while fetching getEventsInCity: " + error);
  }
};
