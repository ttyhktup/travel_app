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

let response_json = null;

export const sendContinents = async (continents) => {
  console.log("sending signal to backend", continents);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(continents),
  };

  const response = await fetch(`${apiUrl}/continents`, requestOptions);

  if (response.status !== 201) {
    throw new Error("Unable to send list of continents");
  }

  const new_response = await response.json();
  response_json = new_response;
  return response_json;
};