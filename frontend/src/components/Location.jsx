import "./Location.css"
/* eslint-disable react/prop-types */

export const Location = (props) => {
    return (
        <div className="location-container">
            <div>
            <div><p className="location-city">{props.cityName}</p></div>
                <div><p>Country: <b>{props.countryName}</b></p></div>
                <div><p>Average Temp During Your Trip: {props.Temp}</p></div>
            </div>
            <button className="location-button">
                <a href={props.bookingLink} target="_blank" rel="noreferrer">Book a Hotel</a>
            </button>
        </div>
    )
}

