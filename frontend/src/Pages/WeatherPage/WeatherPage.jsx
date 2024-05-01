import { useNavigate } from "react-router-dom";
import { usePreferences } from "../../context/preferences";
import { sendTravelPreferences } from "../../Services/BackendService";
import "./WeatherPage.css"
import { useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";

export const WeatherPage = () => {
const { preferences, setPreferences } = usePreferences();
const handleWeatherSelect = (mintemp, maxtemp) => {

if (!preferences.MinTemp.includes(mintemp)) {
  setPreferences((prevPreferences) => ({
      ...prevPreferences,
      MinTemp: [...prevPreferences.MinTemp, mintemp]
  }));
}

// Check if the max temp is already selected; if not, add it to the array
if (!preferences.MaxTemp.includes(maxtemp)) {
  setPreferences((prevPreferences) => ({
      ...prevPreferences,
      MaxTemp: [...prevPreferences.MaxTemp, maxtemp]
  }));
}
};

const [loading, setLoading] = useState(false);

const navigate = useNavigate();

console.log("PREFERENCES:", preferences)

const handleNextpage = () => {
  setLoading(true)
  const getRecommendations = async (preferences) => {
    const data = await sendTravelPreferences(preferences);
    console.log("THIS IS FRONTEND RECEIVED DATA")
    console.log(data)
    if (!preferences.recommendations.includes(data)){

      const newPreferences = {
        ...preferences,
        recommendations: [...preferences.recommendations, data]
      }

      setPreferences(newPreferences);
      navigate('/Recommendations')
    }
}
  getRecommendations(preferences)
}


return (
  <div>
    {
      loading ? ( 
      <div className="loader">   
      <BounceLoader
          color= {"#5bcfc2"}
          loading={loading}
          // cssOverride={override}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
      ) : (
  <div className="weather-container">
      <h4>3. What weather would you prefer?</h4>
      <label className="checkbox-container" onClick={() => handleWeatherSelect(30, 1000)}>
          <input type="radio" name="option"/>
          I prefer hot weather (above 30°C)
      </label>
      <label className="checkbox-container" onClick={() => handleWeatherSelect(20, 29)}>
          <input type="radio" name="option"/>
          I prefer warm weather and sunshine (20°C - 29°C)
      </label>
      <label className="checkbox-container" onClick={() => handleWeatherSelect(15, 19)}>
          <input type="radio" name="option"/>
          I enjoy mild temperatures with a mix of sun and clouds (15°C - 19°C)
      </label>
      <label className="checkbox-container" onClick={() => handleWeatherSelect(5, 14)}>
          <input type="radio" name="option"/>
          I like cooler weather but not too cold (5°C - 14°C)
      </label>
      <label className="checkbox-container" onClick={() => handleWeatherSelect(-1000, 5)}>
          <input type="radio" name="option"/>
          I prefer cold weather with snow and winter activities (below 5°C)
      </label>
      <label className="checkbox-container" onClick={() => handleWeatherSelect(-1000, 1000)}>
          <input type="radio" name="option"/>
          I have no strong preference for weather.
      </label>
      <button className="weather-button" onClick={handleNextpage}>Generate Result</button>
  </div>
)
}
</div>
)
};
