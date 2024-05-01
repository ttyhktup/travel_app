import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
//import React from 'react';
import { DatePickerPage } from "../src/Pages/DatePickerPage/DatePicker";
import { ContinentPage } from "../src/Pages/ContinentPage/ContinentPage";
import { WelcomePage } from "../src/Pages/WelcomePage/WelcomePage";
import { WeatherPage } from "../src/Pages/WeatherPage/WeatherPage";
import { RecommendationPage } from "../src/Pages/RecommendationPage/RecommendationPage";
import { usePreferences } from "../src/context/preferences";
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
        expect(screen.getByText("Welcome to FuryRoam!")).toBeInTheDocument();

    });
    
    test("Continet page renders with correct heading", () => {
        render(
            <Router>
                <PreferencesProvider>
                    <ContinentPage />
                </PreferencesProvider>
            </Router>
        );
        expect(screen.getByText("1. Which continent would you like to visit?")).toBeInTheDocument(); 
    });

    test("Date page renders with correct heading", () => {
        render(
            <Router>
            <PreferencesProvider>
                <DatePickerPage />
            </PreferencesProvider>
        </Router>
        );
        expect(screen.getByText("2. Select a Date")).toBeInTheDocument();

    });
    
    
    test("Weather page renders with correct heading", () => {
        render(
            <Router>
            <PreferencesProvider>
                <WeatherPage />
            </PreferencesProvider>
        </Router>
        );
        expect(screen.getByText("3. What weather would you prefer?")).toBeInTheDocument();

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

