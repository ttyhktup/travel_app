import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';

import "./WelcomePage.css"
// export const WelcomePage = () => {
//     return (
//         <div className="Welcome">
//             <h1>Welcome to FuryRoam!</h1>
//             <Link to="/ContinentPage">Start Quiz</Link>
//         </div>
//     );
// };

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
    <div>
      <h1>Welcome to the Travel Preference Quiz!</h1>
      <p>Click the button below to start the quiz.</p>
      <button onClick={handleStartQuiz}>Start Quiz</button>
    </div>
  );
};

export default WelcomePage;

