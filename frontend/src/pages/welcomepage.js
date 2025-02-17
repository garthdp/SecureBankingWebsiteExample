import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './WelcomePage.css'; 
import logo from '../images/apds_logo.png';

const WelcomePage = () => {
    return (
        
        <div className="welcome-page">
            <img src={logo} alt="APDS Logo" className="logo" />
            <h1 className="title">Welcome to Your Transactions!</h1>            
            <p className="subtitle">Get started by logging in or signing up!</p>
            <div className="button-container">
                <Link to="/login">
                    <button className="glow-button">Login</button>
                </Link>
                <Link to="/signup">
                    <button className="glow-button">Sign Up</button>
                </Link>
            </div>
        </div>
    );
};

export default WelcomePage;
