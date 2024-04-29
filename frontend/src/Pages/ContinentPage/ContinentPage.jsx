  import { useNavigate } from "react-router-dom";
  import "./ContinentPage.css"
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
  <div className="continent-container">
  <header>
      <img src="/src/assets/plane.png" alt="" />
      <h3>FuryRoam</h3>
  </header>
  <div className="continent-body">
      <h4>1. Which continent would you like to visit?</h4>
      <div className="continent-images">
          <div className="continent-items">
            <img onClick={() => handleContinentSelect('Europe')} src="/src/assets/europe.png" alt="" />
            <p>Europe</p>
          </div>
          <div className="continent-items">
            <img onClick={() => handleContinentSelect('Asia')} src="/src/assets/asia.png" alt="" />
            <p>Asia</p>
          </div>
          <div className="continent-items">
            <img onClick={() => handleContinentSelect('Oceania')} src="/src/assets/oceania.png" alt="" />
            <p>Oceania</p>
          </div>
          <div className="continent-items">
            <img onClick={() => handleContinentSelect('North America')} src="/src/assets/north-america.png" alt="" />
            <p>North America</p>
          </div>
          <div className="continent-items">
            <img onClick={() => handleContinentSelect('South America')} src="/src/assets/south-america.png" alt="" />
            <p>South America</p>
          </div>
          <div className="continent-items">
            <img onClick={() => handleContinentSelect('Africa')} src="/src/assets/africa.png" alt="" />
            <p>Africa</p>
          </div>
          
      </div>
      <button onClick={handleNextpage}>Next step</button>
  </div>

  </div>
  )
  }
