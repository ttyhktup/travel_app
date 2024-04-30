const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const apiUrl = 'http://localhost:5000';

let cachedCitiesArray = null;

export const sendTravelPreferences = async (preferences) => {
  console.log("sending signal to backend", preferences);
  console.log(BACKEND_URL);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(preferences),
  };

  const response = await fetch(`${BACKEND_URL}/preferences`, requestOptions);

  if (response.status !== 201) {
    throw new Error("Unable to send travel preferences");
  }

  const citiesArray = await response.json();
  console.log(citiesArray);
  cachedCitiesArray = citiesArray; // Cache the cities array
  return citiesArray; // Return the cities array directly
};

export const getCachedCitiesArray = () => {
  return cachedCitiesArray;
};