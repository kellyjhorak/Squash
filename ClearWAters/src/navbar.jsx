import React from "react";
import App from './App';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <header>
            <nav>
            <li id='logo'>
                        <Link to="/homepage" aria-label="Go to homepage">
                            <img src="img/logo.png" alt="Logo" />
                        </Link>
                </li>
                <li id='home-link'>
                        <Link to="/homepage" aria-label="Go to homepage">   
                        </Link>
                </li>
                <li id='map-link'>
                        <Link to="/map" aria-label="Map">Home</Link>
                </li>
                 <li id='resources-link'>
                        <Link to="/resources" aria-label="Resources">Leaderboard</Link>
                 </li>
             <img src="img/logo.png" alt="Home" />
            </nav>       
        </header>
    );
}