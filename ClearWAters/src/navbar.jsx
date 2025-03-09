import React from "react";
import App from './App';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styling.css';
import exampleLogo from './images/logo_large.png';
import hamburger from './images/hamburger_icon.png';
import { useState } from "react";
import { Link } from "react-router-dom"


export default function Navbar() {

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <header>
      <nav id="full-menu">
        <ul>
          <li id='logo'>
            <Link to="/homepage" aria-label="Go to homepage">
            <img src={exampleLogo} alt="Clearwaters logo" />
            </Link>
          </li>
          <li id='home-link'>
            <Link to="/homepage" aria-label="Go to homepage">Home</Link>
          </li>
          <li id='map-link'>
            <Link to="/map" aria-label="Map">Map</Link>
          </li>
          <li id='resources-link'>
            <Link to="/resources" aria-label="Resources">Resources</Link>
          </li>
        </ul>
      </nav>
      
      <div>
        <div id="mini-menu-bar">
            <Link to="/homepage" aria-label="Go to homepage">
                <img id="mini-logo" src={exampleLogo} alt="Clearwaters logo" />
            </Link>
            <img id="hamburger-button"
              className={isMenuVisible ? 'hidden' : ''}
              src={hamburger}
              alt="hamburger menu icon"
              onClick={toggleMenu}
            />
        </div>
    
        <nav id="hamburger-menu" className={isMenuVisible ? 'visible' : 'hidden'}>
          <ul>
            <li id='home-link'>
              <Link to="/homepage" aria-label="Go to homepage">Home</Link>
            </li>
            <li id='map-link'>
              <Link to="/map" aria-label="Map">Map</Link>
            </li>
            <li id='resources-link'>
              <Link to="/resources" aria-label="Resources">Resources</Link>
            </li>
          </ul>
        </nav>
      </div>
      
    </header>
  );
  }