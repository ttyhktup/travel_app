const apiUrl = 'http://localhost:5000'

export const sendTravelPreferences = async (preferences) => {
  console.log("sending singal to backend", preferences)
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
  
    const data = await response.json();
    return data;
  };