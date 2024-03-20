import { IEvent, IUser } from "../interfaces/ModelInterfaces";
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
      throw new Error("Error in getEventById response: " + response.status);
    }

    const data: Event = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching getEventById " + error);
  }
};

export const getEventsInCity = async (token: string, city: string) => {
  try {
    const response = await fetch(`${THIS_URL}/city/${city}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error in getEventsInCity response: " + response.status);
    }

    const data: IEvent[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching getEventsInCity: " + error);
  }
};

export const getHostForEvent = async (token: string, eventId: number) => {
  try {
    const response = await fetch(`${THIS_URL}/host?eventId=${eventId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error in getEventsInCity response: " + response.status);
    }

    const data: IUser = await response.json();
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
      throw new Error(
        "Error in getUserFriendEvents response: " + response.status
      );
    }

    const data: IEvent[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching getUserFriendEvents " + error);
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
      throw new Error(
        "Error in getUserEventInvites response: " + response.status
      );
    }

    const data: IEvent[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching getUserEventInvites " + error);
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
      throw new Error(
        "Error in getUserJoinedEvents response: " + response.status
      );
    }

    const data: IEvent[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching getUserJoinedEvents " + error);
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
      throw new Error("Error in createEvent response " + response.status);
    }

    return response.status;
  } catch (error) {
    console.error("Error while fetching createEvent " + error);
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
      throw new Error("Error in updateEvent response: " + response.status);
    }

    const data: IEvent = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching updateEvent " + error);
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
      throw new Error("Error in deleteEvent response: " + response.status);
    }

    return response.status;
  } catch (error) {
    console.error("Error while fetching deleteEvent " + error);
  }
};
