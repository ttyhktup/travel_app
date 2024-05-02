import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoRecommendationsModel = () => {
  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate('/');
  };

  return (
    <div className="model">
      <div className="model-content">
        <p>Unfortunately, there is nowhere that matches your selection. Please try again!</p>
        <button onClick={handleNextPage}>Start Again</button>
      </div>
    </div>
  );
};

export default NoRecommendationsModel;