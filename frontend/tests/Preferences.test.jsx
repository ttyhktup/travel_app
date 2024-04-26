import { screen, render } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
//import React from 'react';
import { ContinentPage } from "../src/Pages/ContinentPage/ContinentPage";
//import { usePreferences } from "../src/context/preferences";
import { PreferencesProvider } from "../src/context/preferences";
//import { useNavigate } from "react-router-dom"


describe("Continent Page", () => {
  test("Renders with correct heading", () => {
    render(
        <Router>
            <PreferencesProvider>
                <ContinentPage />
            </PreferencesProvider>
        </Router>
    );
    expect(screen.getByText("Furyroam")).toBeInTheDocument(); // Target the <h3> directly
});





});