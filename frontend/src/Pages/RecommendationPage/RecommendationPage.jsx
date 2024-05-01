/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { usePreferences } from "../../context/preferences";
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './RecommendationPage.css'
import { Location } from '../../components/Location';
import { sendTravelPreferences } from '../../Services/BackendService';
import BounceLoader from "react-spinners/BounceLoader";

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
        
        map.flyTo({
            zoom: 11,
            center: [props.longitude, props.latitude],
            essential: true, // this animation is considered essential with respect to prefers-reduced-motion
            duration: 8000
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
                let distancePerSecond = 1000 / secondsPerRevolution;
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
    const { preferences, setPreferences } = usePreferences();
    const [index, setIndex] = useState(0);
    const [dataReceived, setDataReceived] = useState(null)
    const [currentDict, setCurrentDict] = useState(null);
    const [city, setCity] = useState(null);
    const [values, setValues] = useState(null);

    const handleClick = () => {
        
        if (index < (dataReceived.length-1)) {
            setIndex(index+1)
            setCurrentDict(dataReceived[index]);
            setCity(Object.keys(dataReceived[index])[0]);
            setValues(Object.values(dataReceived[index])[0]);
        } else {
            setIndex(0)
            setCurrentDict(dataReceived[index]);
            setCity(Object.keys(dataReceived[index])[0]);
            setValues(Object.values(dataReceived[index])[0]);
        }
    }

    const zoom = 1;

    useEffect(() => {
        const getRecommendations = async (preferences) => {
        const data = await sendTravelPreferences(preferences);
        
        if (!preferences.recommendations.includes(data)) {
            setDataReceived(data)
            setCurrentDict(data[index]);
            setCity(Object.keys(data[index])[0]);
            setValues(Object.values(data[index])[0]);

            const newPreferences = {
                ...preferences,
                recommendations: [...preferences.recommendations, data]
            }
        
            setPreferences(newPreferences)
        }
        
        setLoading(false);
    } 
    getRecommendations(preferences)
    }, [])
    
    return (
    <div>
        { loading ? (
            <div className="loader">   
            <BounceLoader
                color= {"#5bcfc2"}
                loading={loading}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            <div><p className="wait">Good things come to those who wait...</p></div>
            </div>
        ) : 
        ( 
        <div className="Continent">
            <h3>YOUR RECOMMENDATIONS</h3>
            {loading && <p>Loading...</p>}
            <br></br>
            {!loading && currentDict && city && values && (
                <>
                <MapboxMap latitude={values[3]} longitude={values[4]} zoom={zoom}/> 
                <br></br>
                <button id="fly" onClick={() => handleClick()}>Fly</button>
                <br></br>
                <Location cityName={city} countryName={values[0]} Temp={values[1]} bookingLink={values[2]}/>
                </>
            )}
            {!loading && currentDict === null && (
                <p>No recommendations available.</p>
            )}
        </div>
        )
        
        }
    </div>
    );
};

