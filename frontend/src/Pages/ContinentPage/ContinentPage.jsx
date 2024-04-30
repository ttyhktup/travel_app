  import { useNavigate } from "react-router-dom";
  import "./ContinentPage.css"
  import { usePreferences } from "../../context/preferences";
  import { useState } from "react";
  import { sendContinents } from "../../Services/BackendService";


  export const ContinentPage = () => {
  const { preferences, setPreferences } = usePreferences();

    const handleContinentSelect = (continent) => {
    if (!preferences.Continent.includes(continent)) {
        setPreferences({
            ...preferences,
            Continent: [...preferences.Continent, continent]
        })
    } else if (preferences.Continent.includes(continent)){
      setPreferences({
        ...preferences,
      Continent: preferences.Continent.filter(item => item !== continent)
      })
    }
  };
    
    const [EuropeClass, setEuropeClass] = useState("continent-image-item")
    const [AsiaClass, setAsiaClass] = useState("continent-image-item")
    const [OceaniaClass, setOceaniaClass] = useState("continent-image-item")
    const [NorthAmericaClass, setNorthAmericaClass] = useState("continent-image-item")
    const [SouthAmericaClass, setSouthAmericaClass] = useState("continent-image-item")
    const [AfricaClass, setAfricaClass] = useState("continent-image-item")
    function addClassToEurope() {
      setEuropeClass(prevClass => prevClass === "continent-image-item" ? "clicked" : "continent-image-item");
    }
    function addClassToAsia() {
      setAsiaClass(prevClass => prevClass === "continent-image-item" ? "clicked" : "continent-image-item");
    }
    function addClassToOceania() {
      setOceaniaClass(prevClass => prevClass === "continent-image-item" ? "clicked" : "continent-image-item");
    }
    function addClassToNorthAmerica() {
      setNorthAmericaClass(prevClass => prevClass === "continent-image-item" ? "clicked" : "continent-image-item");
    }
    function addClassToSouthAmerica() {
      setSouthAmericaClass(prevClass => prevClass === "continent-image-item" ? "clicked" : "continent-image-item");
    }
    function addClassToAfrica() {
      setAfricaClass(prevClass => prevClass === "continent-image-item" ? "clicked" : "continent-image-item");
    }

    const navigate = useNavigate();
    const handleNextpage = () => {
    let continents = []
    continents = preferences.Continent
    console.log(continents)
    const getContinents = async (continents) => {
      const data = await sendContinents(continents);
      
      if (!preferences.citiesData.includes(data)){
        setPreferences((prevPreferences) => ({
            ...prevPreferences,
            citiesData: [...prevPreferences.citiesData, data]
        }));
    }
    navigate('/Date');
      return data
    }
    const data = getContinents(continents)
    console.log(data)
  }

  return (
  <div className="continent-container">
  <div className="continent-body">
      <h4>1. Which continent would you like to visit?</h4>
      <p>If you don't have a specific preference click next without selecting a continent.</p>
      <div className="continent-images">
          <div className="continent-items">
            <img className={EuropeClass} onClick={() => {handleContinentSelect('Europe'); addClassToEurope()}} src="/src/assets/europe.png" alt="" />
            <p>Europe</p>
          </div>
          <div className="continent-items">
            <img className={AsiaClass} onClick={() => {handleContinentSelect('Asia'); addClassToAsia()}} src="/src/assets/asia.png" alt="" />
            <p>Asia</p>
          </div>
          <div className="continent-items">
            <img className={OceaniaClass} onClick={() => {handleContinentSelect('Oceania'); addClassToOceania()}} src="/src/assets/oceania.png" alt="" />
            <p>Oceania</p>
          </div>
          <div className="continent-items">
            <img className={NorthAmericaClass} onClick={() => {handleContinentSelect('North America'); addClassToNorthAmerica()}} src="/src/assets/north-america.png" alt="" />
            <p>North America</p>
          </div>
          <div className="continent-items">
            <img className={SouthAmericaClass} onClick={() => {handleContinentSelect('South America'); addClassToSouthAmerica()}} src="/src/assets/south-america.png" alt="" />
            <p>South America</p>
          </div>
          <div className="continent-items">
            <img className={AfricaClass} onClick={() => {handleContinentSelect('Africa'); addClassToAfrica()}} src="/src/assets/africa.png" alt="" />
            <p>Africa</p>
          </div>
      </div>
      <button className="continent-button" onClick={handleNextpage}>Next step</button>
  </div>

  </div>
  )
  }
