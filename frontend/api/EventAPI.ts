const BASE_URL: string = '';

// getEventById ...

const getEventsInCity = async (city: string) => {
  try {
    const response = await fetch(`${BASE_URL}/city${city}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error in response: ' + response.status);
    }

    return await response.json();
  } catch (error) {
    console.error('Error while fetching getEventsInCity: ' + error);
  }
};
