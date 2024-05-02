import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./ApiRedirect.css"

const ApiRedirectModel = () => {
  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate('/');
  };

  return (
    <div className="model-API">
      <div className="model-content-API">
        <p>Oopsie daisy! <br /> Looks like your selection vanished into thin air. Give it another go, and let's hope the universe decides to cooperate this time.
        </p>
        <button className='model-button-API' onClick={handleNextPage}>Start Again</button>
      </div>
    </div>
  );
};

export default ApiRedirectModel;