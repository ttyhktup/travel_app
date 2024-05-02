import React from 'react';
import { useNavigate } from 'react-router-dom';

const ApiRedirectModel = () => {
  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate('/');
  };

  return (
    <div className="model-API">
      <div className="model-content-API">
        <p>Sorry something went wrong, please start again
        </p>
        <button onClick={handleNextPage}>Start Again</button>
      </div>
    </div>
  );
};

export default ApiRedirectModel;