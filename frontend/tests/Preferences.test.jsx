import { screen, render } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
//import React from 'react';
import { ContinentPage } from "../src/Pages/ContinentPage/ContinentPage";
import { WelcomePage } from "../src/Pages/WelcomePage/WelcomePage";
import { WeatherPage } from "../src/Pages/WeatherPage/WeatherPage";
import { RecommendationPage } from "../src/Pages/RecommendationPage/RecommendationPage";
//import { usePreferences } from "../src/context/preferences";
import { PreferencesProvider } from "../src/context/preferences";
//import { useNavigate } from "react-router-dom"


describe("Continent Page", () => {

    test("Welcome page renders with correct heading", () => {
        render(
            <Router>
            <PreferencesProvider>
                <WelcomePage />
            </PreferencesProvider>
        </Router>
        );
        expect(screen.getByText("Welcome to the Travel Preference Quiz!")).toBeInTheDocument();

    });
    
    test("Continet page renders with correct heading", () => {
        render(
            <Router>
                <PreferencesProvider>
                    <ContinentPage />
                </PreferencesProvider>
            </Router>
        );
        expect(screen.getByText("Furyroam")).toBeInTheDocument(); 
    });

    test("Weather page renders with correct heading", () => {
        render(
            <Router>
            <PreferencesProvider>
                <WeatherPage />
            </PreferencesProvider>
        </Router>
        );
        expect(screen.getByText("2. What weather would you prefer?")).toBeInTheDocument();

    });

    test("Recommendation page renders with correct heading", () => {
        render(
            <Router>
            <PreferencesProvider>
                <RecommendationPage />
            </PreferencesProvider>
        </Router>
        );
        expect(screen.getByText("YOUR RECOMMENDATIONS")).toBeInTheDocument();

    });


});