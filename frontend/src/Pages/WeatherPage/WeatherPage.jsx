
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { usePreferences } from "../../context/preferences";
import { sendTravelPreferences } from "../../Services/BackendService";


export const WeatherPage = () => {
    const { preferences, setPreferences } = usePreferences();
  
    const handleWeatherSelect = (mintemp, maxtemp) => {
      setPreferences({
        ...preferences,
        MinTemp: [...preferences.MinTemp, mintemp],
        MaxTemp: [...preferences.MaxTemp, maxtemp],

      });
    };
    
    const navigate = useNavigate();
    const handleNextpage = () => {
      console.log(preferences)
      navigate('/Recommendations')
      sendTravelPreferences(preferences);
    

    }

    




    return (
        <div className="Weather">
            <header>
                <h3>Furyroam</h3>
            </header>
            <h3>2. What weather would you prefer?</h3>
            <button onClick={() => handleWeatherSelect(30, 1000)}>I prefer hot weather (above 30°C)</button>
      <button onClick={() => handleWeatherSelect(20, 29)}>I prefer warm weather and sunshine (20°C - 29°C)</button>
      <button onClick={() => handleWeatherSelect(15, 19)}>I enjoy mild temperatures with a mix of sun and clouds (15°C - 19°C)</button>
      <button onClick={() => handleWeatherSelect(5, 14)}>I like cooler weather but not too cold (5°C - 14°C)</button>
      <button onClick={() => handleWeatherSelect(5, -1000)}>I prefer cold weather with snow and winter activities (below 5°C)</button>
      <button onClick={() => handleWeatherSelect(-1000, 1000)}>I have no strong preference for weather.</button>
      <button onClick={handleNextpage}>Logging</button>
        </div>
    )
}
