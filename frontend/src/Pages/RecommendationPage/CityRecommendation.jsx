import React from 'react';

const CityRecommendation = ({ cityData }) => {
  // Extract data from cityData object
  const { cityName, description, imageSrc } = cityData;

  return (
    <div className="city-recommendation">
      <h4>{cityName}</h4>
      <img src={imageSrc} alt={cityName} />
      <p>{description}</p>
    </div>
  );
};

export default CityRecommendation;