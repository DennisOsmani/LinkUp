import { IEventRelations } from "../interfaces/ModelInterfaces";
import { URL_BASE, EVENTRELATION_PATH } from "./UrlPaths";

const THIS_URL: string = `${URL_BASE}${EVENTRELATION_PATH}`;

export const getEventRelation = async (token: string, eventId: number) => {
  try {
    const response = await fetch(`${THIS_URL}?eventId=${eventId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error in getEventrelation response: " + response.status);
    }

    const data: IEventRelations = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching getEventRelation " + error);
  }
};

export const inviteUsersForEvent = async (
  eventId: number,
  userIds: string[],
  token: string
) => {
  try {
    const response = await fetch(`${THIS_URL}/create/${eventId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userIds),
    });

    if (!response.ok) {
      throw new Error(
        "Error in inviteUsersForEvent response: " + response.status
      );
    }

    return response.status;
  } catch (error) {
    console.error("Error while fetching inviteUsersForEvent " + error);
  }
};

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

export const removeFromEvent = async (
  token: string,
  eventId: number,
  userId?: string
) => {
  try {
    let url = `${THIS_URL}?eventId=${eventId}`;

    if (userId) {
      url += `&userId=${userId}`;
    }
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        "Error in removeUserFromEvent response: " + response.status
      );
    }

    return response.status;
  } catch (error) {
    console.error("Error while removing user from event " + error);
  }
};

export const updateEventRelationParticipation = async (
  token: string,
  eventId: number,
  participation: string
) => {
  try {
    const response = await fetch(
      `${THIS_URL}/participation?eventId=${eventId}&participation=${participation}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        "Error in updateEventRelationParticipation, response: " +
          response.status
      );
    }

    const data: IEventRelations = await response.json();
    return data;
  } catch (error) {
    console.error("Error while updating eventrelationparticipation " + error);
  }
};

export const updateEventParticipation = async (
  eventId: number,
  participation: string,
  token: string
) => {
  try {
    const response = await fetch(`${THIS_URL}/participation/${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(participation),
    });

    if (!response.ok) {
      throw new Error(
        "Error in updateEventParticipation  response: " + response.status
      );
    }

    console.log("Left event!");
  } catch (error) {
    console.error("Error while fetching updateEventParticipation  " + error);
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
*/
