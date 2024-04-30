import { useNavigate } from "react-router-dom";
import { usePreferences } from "../../context/preferences";
import { sendTravelPreferences } from "../../Services/BackendService";
import "./WeatherPage.css"

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

const navigate = useNavigate();
const handleNextpage = () => {
    const data = sendTravelPreferences(preferences);
    if (!preferences.recommendations.includes(data)){
        setPreferences((prevPreferences) => ({
            ...prevPreferences,
            recommendations: [...prevPreferences.recommendations, data]
        }));
    }
    navigate('/Recommendations')
}

return (
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
