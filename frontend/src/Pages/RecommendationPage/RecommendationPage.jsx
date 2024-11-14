/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { usePreferences } from "../../context/preferences";
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './RecommendationPage.css'
import { Location } from '../../components/Location';
import { sendTravelPreferences } from '../../Services/BackendService';
import BounceLoader from "react-spinners/BounceLoader";
import NoRecommendationsModel from '../../components/NoRecommendation';

const MapboxMap = (props) => {
    // Add your Mapbox Access Token here
    mapboxgl.accessToken = 'pk.eyJ1IjoibWlnaHR5Z29yZyIsImEiOiJjbHZtYXd3a2swMGh4Mmlxb2RqaXpiMG4yIn0.uHYDunUwBYxEooSTEXYkVA';

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/satellite-streets-v12', // style URL
            projection: 'globe',
            center: [0, 0], // starting position [lng, lat]
            zoom: props.zoom // starting zoom
        });

        var latitudeLongitudeList = props.latLong

        var countLat = 1
        var countLong = 0

        const firstFlyDown = () => {
            map.flyTo({
                zoom: 11,
                center: [latitudeLongitudeList[countLong], latitudeLongitudeList[countLat]],
                essential: true, // this animation is considered essential with respect to prefers-reduced-motion
                duration: 8000
            });
            countLat = countLat + 2
            countLong = countLong + 2
        }

        firstFlyDown(countLat, countLong)

        document.getElementById('fly').addEventListener('click', () => {
            map.flyTo({
                zoom: 11,
                center: [latitudeLongitudeList[countLong], latitudeLongitudeList[countLat]],
                essential: true, // this animation is considered essential with respect to prefers-reduced-motion
                duration: 8000
            });
            countLat = countLat + 2
            countLong = countLong + 2
        })

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
    const [latLong, setLatLong] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)


    const handleClick = () => {
        if (dataReceived.length === 1) {
            setErrorMessage("No more recommendations available.");
            return;
        }

        if (index < (dataReceived.length - 1)) {
            setIndex(index + 1);
            setCurrentDict(dataReceived[index + 1]);
            setCity(Object.keys(dataReceived[index + 1])[0]);
            setValues(Object.values(dataReceived[index + 1])[0]);
        } else {
            setIndex(0);
            setCurrentDict(dataReceived[index]);
            setCity(Object.keys(dataReceived[index])[0]);
            setValues(Object.values(dataReceived[index])[0]);
        }
        setErrorMessage(null); // Reset error message
    };

    const zoom = 1;

    useEffect(() => {
        const abortController = new AbortController()

        const getRecommendations = async (preferences) => {

            try {
                const data = await sendTravelPreferences(preferences, { signal: abortController.signal });

                if (Array.isArray(data) && data.length === 0) {
                    // Render the "No Recommendations available" HTML
                    setLoading(false);
                    return; // Exit the function
                }

                if (!preferences.recommendations.includes(data)) {

                    setDataReceived(data);
                    setCurrentDict(data[index]);
                    setCity(Object.keys(data[index])[0]);
                    setValues(Object.values(data[index])[0]);

                    var latitudeLongitudeList = []
                    for (var i = 0; i < data.length; i++) {
                        for (var key in data[i]) {
                            latitudeLongitudeList.push(data[i][key][4])
                            latitudeLongitudeList.push(data[i][key][3])
                        }
                    }
                    setLatLong(latitudeLongitudeList)

                    if (latitudeLongitudeList.length === 1) {
                        setErrorMessage("Only one country available."); // Set error message
                    } else {
                        setErrorMessage(null); // Reset error message if there are multiple countries
                    }

                    const newPreferences = {
                        ...preferences,
                        recommendations: [...preferences.recommendations, data]
                    }

                    setPreferences(newPreferences)
                }

                setLoading(false);
            } catch (error) {
                if (error.name == 'AbortError') {
                    console.log('continuing...')
                } else {
                    console.error("Error fetching data:", error)
                }
            }
        }
        getRecommendations(preferences)

        return () => {
            abortController.abort();
        };
    }
        , [])

    return (
        <div>
            {loading ? (
                <div className='loader-container'>
                    <div className="loader">
                        <BounceLoader
                            color={"#5bcfc2"}
                            loading={loading}
                            size={100}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                        <div><p className="wait">Good things come to those who wait...</p></div>
                    </div>
                </div>
            ) :
                (
                    <div className="recommendations-container">
                        <h3>YOUR RECOMMENDATIONS</h3>
                        {currentDict && city && values && (
                            <div className="recommendation">
                                <Location cityName={city} countryName={values[0]} Temp={values[1]} bookingLink={values[2]} />
                                <div className='recommendation-map'>
                                    <MapboxMap latLong={latLong} zoom={zoom} />
                                    <button className='recommendation-button' id="fly" onClick={() => handleClick()}>Next Recommendation</button>
                                </div>
                            </div>
                        )}
                        {!loading && currentDict === null && (
                            <NoRecommendationsModel />
                        )}
                    </div>
                )

            }
        </div>
    );
};

