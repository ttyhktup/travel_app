import { useNavigate } from "react-router-dom";
//import React, { useState } from 'react';
import { usePreferences } from "../../context/preferences";


export const ContinentPage = () => {
    const { preferences, setPreferences } = usePreferences();
  
    const handleContinentSelect = (continent) => {
      if (!preferences.Continent.includes(continent)) {
          setPreferences({
              ...preferences,
              Continent: [...preferences.Continent, continent]
          });
      }
  };
        
    const navigate = useNavigate();
        const handleNextpage = () => {
          console.log(preferences)
          navigate('/Weather');
        

            
    }
   

    




    return (
        <div className="Continent">
            <header>
                <h3>Furyroam</h3>
            </header>
            <h3>1. Which continent would you like to visit?</h3>
            <button onClick={() => handleContinentSelect('Europe')}>Europe</button>
      <button onClick={() => handleContinentSelect('Asia')}>Asia</button>
      <button onClick={() => handleContinentSelect('Oceania')}>Oceania</button>
      <button onClick={() => handleContinentSelect('North America')}>North America</button>
      <button onClick={() => handleContinentSelect('South America')}>South America</button>
      <button onClick={() => handleContinentSelect('Africa')}>Africa</button>
      <button onClick={handleNextpage}>Next step</button>
        </div>
    )
}
