import { Link } from "react-router-dom";

import "./ContinentPage.css"
export const ContinentPage = () => {

    




    return (
        <div className="Continent">
            <header>
                <h3>Furyroam</h3>
            </header>
            <h3>1. Which continent would you like to visit?</h3>
            <button type="button">Europe</button>
            <button type="button">Asia</button>
            <button type="button">Oceania</button>
            <button type="button">North America</button>
            <button type="button">South America</button>
            <button type="button">Africa</button>
            <Link to="/WeatherPage">Next Step</Link>
        </div>
    )
}