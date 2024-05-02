import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Location.css"

const NoRecommendationsModel = () => {
  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate('/');
  };

  return (
    <div className="model">
      <div className="model-content">
        <div>Well, surprise, surprise! Your selection doesn't exist. Try again, but this time, maybe pick something that actually exists.</div>
        <button className='model-button' onClick={handleNextPage}>Start Again</button>
      </div>
    </div>
  );
};

export default NoRecommendationsModel;