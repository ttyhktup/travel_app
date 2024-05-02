import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import "./WelcomePage.css"
import { usePreferences } from "../../context/preferences";

export const WelcomePage = () => {
  const { preferences, setPreferences } = usePreferences()

  const navigate = useNavigate();

  const handleStartQuiz = () => {
    // Navigate to the first quiz page
    navigate('/Continent');
};

  return (
    <div className="welcome-container">

      <div className="welcome-info">
        <div className="welcome-content">
          <div><h1>Welcome to FuryRoam!</h1></div>
          <div><p>We simplify your travel decisions 
          with personalised recommendations.
          Explore at the speed of thought with our travel app.</p></div>
          <button className="welcome-button" onClick={handleStartQuiz}>Start Quiz</button>
        </div>
      </div>

      <div className="welcome-image">
      </div>
      
    </div>
  );
};

export default WelcomePage;

