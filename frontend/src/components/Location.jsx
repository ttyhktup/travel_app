/* eslint-disable react/prop-types */
export const Location = (props) => {
    return (
        <>
        <div className="Location"/>
        <h1>{props.cityName}</h1>
        <h3>{props.countryName}</h3>
        <article>Average Temp During Your Trip: {props.Temp}</article>
        <a href={props.bookingLink}>Book a Hotel</a>
        </>
    )
}

