const apiUrl = 'http://localhost:5000';

let cachedCitiesArray = null;

export const sendTravelPreferences = async (preferences) => {
  console.log("sending signal to backend", preferences);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(preferences),
  };

  const response = await fetch(`${apiUrl}/preferences`, requestOptions);

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