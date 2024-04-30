import React, { useEffect, useState } from 'react';
import { usePreferences } from "../../context/preferences";

export const RecommendationPage = () => {
    // const [loading, setLoading] = useState(true);
    const [citiesArray, setCitiesArray] = useState(null);
    const { preferences, setPreferences } = usePreferences();

    useEffect(() => {
        const interval = setInterval(() => {
            const cachedCities = preferences['recommendations']; // Get cached cities array
            // console.log(cachedCities)
            if (cachedCities) {
                setCitiesArray(cachedCities);
                // setLoading(false);
                clearInterval(interval); // Stop the interval when cities are fetched
            }
        }, 1000); // Check every 1 second for cached cities

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div className="Continent">
            <h3>YOUR RECOMMENDATIONS</h3>
        </div>
    );
};