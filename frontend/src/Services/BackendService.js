const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// const apiUrl = 'http://localhost:8080';

export const sendTravelPreferences = async (preferences, options = {}) => {
  
  const { signal } = options;
  console.log("sending signal to backend", preferences);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(preferences),
    signal: signal
  };

  const response = await fetch(`${BACKEND_URL}/preferences`, requestOptions);

  if (response.status !== 201) {
    throw new Error("Unable to send travel preferences");
  }
  const citiesArray = await response.json();
  return citiesArray; // Return the cities array directly
};


export const sendContinents = async (continents, options = {}) => {
  const { signal } = options;
  console.log("sending signal to backend", continents);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(continents),
    signal: signal
  };

  const response = await fetch(`${BACKEND_URL}/continents`, requestOptions);

  if (response.status !== 201) {
    throw new Error("Unable to send list of continents");
  }

  const new_response = await response.json();
  return new_response
};