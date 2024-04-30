import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import "./WelcomePage.css"

export const WelcomePage = () => {
  const [preferences, setPreferences] = useState({
    continent: [],
    minTemp: [],
    maxTemp: [],
  });

  const navigate = useNavigate();

  const handleStartQuiz = () => {
    // Navigate to the first quiz page
    navigate('/Continent');
};

  return (
    <div className="welcome-container">

      <div className="welcome-info">
        {/* <div className="welcome-logo">
          <img src="/src/assets/plane.png" alt="" />
        </div> */}
        
        <div className="welcome-content">
          <h1>Welcome to FuryRoam!</h1>
          <p>We simplify your travel decisions 
          with personalised recommendations.
          Explore at the speed of thought, with our travel app.</p>
          <button className="welcome-button" onClick={handleStartQuiz}>Start Quiz</button>
        </div>
      </div>

      <div className="welcome-image">
        {/* <div className="welcome-page-image"></div> */}
      </div>
      
    </div>
  );
};

export default WelcomePage;

