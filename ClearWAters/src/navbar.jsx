import React from "react";
import App from './App';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styling.css';
import exampleLogo from './images/logo_large.png';
import hamburger from './images/hamburger_icon.png';

import { Link } from "react-router-dom"

export default function Navbar() {
    return (
      <header>
        <nav id="full-menu">
          <ul> {/* Wrap the listt items in a <ul> */}
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
        <img id="hamburger-button" class="hidden" src={hamburger} alt="hambuger menu icon"/>
        <nav id="hamburger-menu" class="hidden">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>
    );
  }