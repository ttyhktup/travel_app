/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { getCachedCitiesArray } from "../../Services/BackendService";
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './RecommendationPage.css'
import { Location } from '../../components/Location';

const MapboxMap = (props) => {
    // Add your Mapbox Access Token here
    mapboxgl.accessToken = 'pk.eyJ1IjoibWlnaHR5Z29yZyIsImEiOiJjbHZtYXd3a2swMGh4Mmlxb2RqaXpiMG4yIn0.uHYDunUwBYxEooSTEXYkVA';
    
    useEffect(() => {        
        const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        projection: 'globe',
        center: [props.longitude, props.latitude], // starting position [lng, lat]
        zoom: props.zoom // starting zoom
        });
        
        document.getElementById('fly').addEventListener('click', () => {
            // Fly to a random location
            map.flyTo({
                center: [(Math.random() - 0.5) * 360, (Math.random() - 0.5) * 100],
                essential: true // this animation is considered essential with respect to prefers-reduced-motion
            });
        });


        // The following values can be changed to control rotation speed:

        // At low zooms, complete a revolution every two minutes.
        const secondsPerRevolution = 240;
        // Above zoom level 5, do not rotate.
        const maxSpinZoom = 5;
        // Rotate at intermediate speeds between zoom levels 3 and 5.
        const slowSpinZoom = 2;

        let userInteracting = false;
        const spinEnabled = true;

        function spinGlobe() {
            const zoom = map.getZoom();
            if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
                let distancePerSecond = 360 / secondsPerRevolution;
                if (zoom > slowSpinZoom) {
                    // Slow spinning at higher zooms
                    const zoomDif =
                        (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
                    distancePerSecond *= zoomDif;
                }
        const center = map.getCenter();
        center.lng -= distancePerSecond;
        // Smoothly animate the map over one second.
        // When this animation is complete, it calls a 'moveend' event.
        map.easeTo({ center, duration: 1000, easing: (n) => n });
            }
        }
        
        // Pause spinning on interaction
        map.on('mousedown', () => {
            userInteracting = true;
        });
        map.on('dragstart', () => {
            userInteracting = true;
        });
        
        map.on('moveend', () => {
            spinGlobe();
        });
        
        map.on('style.load', () => {
            // Custom atmosphere styling
            map.setFog({
                'color': 'rgb(220, 159, 159)', // Pink fog / lower atmosphere
                'high-color': 'rgb(36, 92, 223)', // Blue sky / upper atmosphere
                'horizon-blend': 0.2 // Exaggerate atmosphere (default is .1)
        });
    });
        return () => map.remove();
    }, [props.longitude, props.latitude, props.zoom]);

    return <div id="map" className="map-container" />;
    };

export const RecommendationPage = () => {
    const [loading, setLoading] = useState(true);
    const [citiesArray, setCitiesArray] = useState(null);
    
    const longitude = 1.145
    const latitude = 53.68;
    const zoom = 2;
    
    useEffect(() => {
        const interval = setInterval(() => {
            const cachedCities = getCachedCitiesArray(); // Get cached cities array
            if (cachedCities) {
                setCitiesArray(cachedCities);
                setLoading(false);
                clearInterval(interval); // Stop the interval when cities are fetched
            }
        }, 1000); // Check every 1 second for cached cities

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div className="Continent">
            <h3>YOUR RECOMMENDATIONS</h3>
            {loading && <p>Loading...</p>}
            <MapboxMap latitude={latitude} longitude={longitude} zoom={zoom}/> 
            <br></br>
            <button id="fly">Fly</button>
            {!loading && citiesArray && (
                <div>
                    {citiesArray.map((continentData, index) => (
                        <div key={index}>
                            {Object.keys(continentData).map(city => (
                                <Location key={city} cityName={city} countryName={continentData[city][0]} Temp={continentData[city][1]} bookingLink={continentData[city][2]}/>
                            ))}
                        </div>
                    ))}   
                </div>
            )}
            {!loading && citiesArray === null && (
                <p>No recommendations available.</p>
            )}
        </div>
    );
};

