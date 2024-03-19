const BASE_URL: string = "http://localhost/api/event";

/**
api/event/{eventId} (GET) 
api/event/city/{city} (GET)
api/event/friends (GET)
api/event/invites (GET)
api/event/joined (GET)
api/event/create (POST)
api/event/ (PUT)
api/event/ (DELETE)
*/

// getEventById

const getEventsInCity = async (city: string) => {
  try {
    const response = await fetch(`${BASE_URL}/city${city}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error in response: " + response.status);
    }

    return await response.json();
  } catch (error) {
    console.error("Error while fetching getEventsInCity: " + error);
  }
};

const getUserFriendEvents = async (eventId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/${eventId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error in response: " + response.status);
    }

    return await response.json();
  } catch (error) {
    console.error("Error while fetching getEventsInCity: " + error);
  }
};

// Get user eventInvites

// Get user joined events

// Create Event

// EUpdateEvent

// Delete event
