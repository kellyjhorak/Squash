import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from './navbar';
import Footer from './Footer';
import './styling.css'; 

import water from './images/water.png';

// Custom droplet icon
const dropletIcon = new L.Icon({
    iconUrl: water,
    iconSize: [30, 30], 
    iconAnchor: [15, 40],
    popupAnchor: [0, -40]
});

// List of counties and coordinates
const counties = {
    "Kitsap": [47.6476, -122.6413],
    "King": [47.6062, -122.3321],
    "Pierce": [47.1698, -122.5185],
    "Spokane": [47.6588, -117.4260],
    "Yakima": [46.6021, -120.5059]
};

// Example water quality data
const waterQualityData = {
    "Kitsap": { pH: 7.2, contaminants: "Lead, Nitrates", status: "Moderate" },
    "King": { pH: 6.8, contaminants: "PFAS, Mercury", status: "High" },
    "Pierce": { pH: 7.5, contaminants: "Arsenic, Chlorine", status: "Low" },
    "Spokane": { pH: 7.0, contaminants: "Bacteria, Copper", status: "Moderate" },
    "Yakima": { pH: 6.5, contaminants: "Nitrates, Fluoride", status: "High" }
};

// Default map settings
const defaultCenter = [47.5, -120.5];
const defaultZoom = 7;

// Component to update the map view
const MapUpdater = ({ center, zoom, resetTrigger }) => {
    const map = useMap();

    React.useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, resetTrigger]); // Reset when trigger updates

    return null;
};

// Reset Button Component (Inside Map)
const ResetButton = ({ onReset }) => {
    const map = useMap();

    const handleClick = () => {
        onReset();
        map.setView(defaultCenter, defaultZoom); // Reset map directly
    };

    return (
        <button onClick={handleClick} className="reset-button">
            Reset Map View
        </button>
    );
};

const MapComponent = () => {
    const [mapCenter, setMapCenter] = useState(defaultCenter);
    const [zoomLevel, setZoomLevel] = useState(defaultZoom);
    const [selectedCounty, setSelectedCounty] = useState('');
    const [selectedWaterQuality, setSelectedWaterQuality] = useState(null);
    const [resetTrigger, setResetTrigger] = useState(0); // Track reset actions

    const handleCountyChange = (event) => {
        const county = event.target.value;
        setSelectedCounty(county);
        if (counties[county]) {
            setMapCenter(counties[county]);
            setZoomLevel(10);
            setSelectedWaterQuality(waterQualityData[county]); // Update water quality data
        }
    };

    const handleMarkerClick = (county, coords) => {
        setMapCenter(coords);
        setZoomLevel(10); // Zoom in further when clicking a marker
        setResetTrigger(prev => prev + 1); // Force MapUpdater to trigger update
        setSelectedWaterQuality(waterQualityData[county]); // Show water quality data
    };

    const handleReset = () => {
        setSelectedCounty('');
        setMapCenter(defaultCenter);
        setZoomLevel(defaultZoom);
        setResetTrigger(prev => prev + 1); // Force MapUpdater to trigger reset
        setSelectedWaterQuality(null); // Clear water quality data
    };

    return (
        <div>
            <Navbar />
            <header>
                <h1>PFAS Contamination Map</h1>
            </header>

            {/* Dropdown menu */}
            <div className="input-section">
                <select value={selectedCounty} onChange={handleCountyChange}>
                    <option value="">Select a County</option>
                    {Object.keys(counties).map((county) => (
                        <option key={county} value={county}>
                            {county}
                        </option>
                    ))}
                </select>
            </div>

            <div className="map-container">
                {/* Map component */}
                <MapContainer center={mapCenter} zoom={zoomLevel} className="map">
                    <MapUpdater center={mapCenter} zoom={zoomLevel} resetTrigger={resetTrigger} />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {Object.entries(counties).map(([county, coords]) => (
                        <Marker
                            key={county}
                            position={coords}
                            icon={dropletIcon}
                            eventHandlers={{
                                click: () => handleMarkerClick(county, coords)
                            }}
                        >
                            <Popup>{county} County</Popup>
                        </Marker>
                    ))}

                    {/* Reset Button inside MapContainer */}
                    <ResetButton onReset={handleReset} />
                </MapContainer>
            </div>

            {/* Water Quality Data Section */}
            {selectedWaterQuality && (
                <div className="water-quality-data">
                    <h2>Water Quality in {selectedCounty} County</h2>
                    <p><strong>pH Level:</strong> {selectedWaterQuality.pH}</p>
                    <p><strong>Contaminants:</strong> {selectedWaterQuality.contaminants}</p>
                    <p><strong>Status:</strong> {selectedWaterQuality.status}</p>
                </div>
            )}    
            
             
            <Footer />
        </div>
    );
};

export default MapComponent;
