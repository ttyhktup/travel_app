import { Link } from "react-router-dom";

import "./WelcomePage.css"
export const WelcomePage = () => {
    return (
        <div className="Welcome">
            <h1>Welcome to FuryRoam!</h1>
            <Link to="/Continent">Start Quiz</Link>
        </div>
    );
};


