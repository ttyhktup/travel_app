const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const sendTravelPreferences = async (preferenceData) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferenceData),
    };
  
    const response = await fetch(`${BACKEND_URL}/preferences`, requestOptions);
  
    if (response.status !== 201) {
      throw new Error("Unable to send travel preferences");
    }
  
    const data = await response.json();
    return data;
  };