import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from './navbar';
import Footer from './Footer';
import './styling.css';
import water from './images/water.png';
import map_data from '../DATA/home-map-final.json';

const dropletIcon = new L.Icon({
    iconUrl: water,
    iconSize: [40, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -40]
});

const counties = {
    "Kitsap": [47.6476, -122.6413],
    "King": [47.6062, -122.3321],
    "Pierce": [47.1698, -122.5185],
    "Spokane": [47.6588, -117.4260],
    "Yakima": [46.6021, -120.5059]
};

const defaultCenter = [47.5, -120.5];
const defaultZoom = 7;

const MapUpdater = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        if (center && zoom) {
            setTimeout(() => {
                map.setView(center, zoom, { animate: true });
            }, 100);
        }
    }, [center, zoom, map]);

    return null;
};

const ResetButton = ({ onReset }) => {
    const map = useMap();
    const handleClick = () => {
        onReset();
        map.setView(defaultCenter, defaultZoom);
    };

    return (
        <button onClick={handleClick} className="reset-button">
            Reset Map View
        </button>
    );
};

const MapComponent = () => {
    const [waterQualityData] = useState(map_data);
    const [mapCenter, setMapCenter] = useState(defaultCenter);
    const [zoomLevel, setZoomLevel] = useState(defaultZoom);
    const [selectedCounty, setSelectedCounty] = useState('');
    const [selectedWaterSystem, setSelectedWaterSystem] = useState('');
    const [selectedPFAS, setSelectedPFAS] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [hasSelectedCounty, setHasSelectedCounty] = useState(false);
    const [popupCounty, setPopupCounty] = useState(null);

    // Filter data based on county, water system, and PFAS type
    useEffect(() => {
        if (!selectedCounty) {
            setFilteredData([]);
            return;
        }

        const data = waterQualityData.filter(entry =>
            entry.County === selectedCounty &&
            (selectedWaterSystem ? entry['Water System Name'] === selectedWaterSystem : true) &&
            (selectedPFAS ? entry['PFAS Measured'] === selectedPFAS : true)
        );

        setFilteredData(data);
    }, [selectedCounty, selectedWaterSystem, selectedPFAS, waterQualityData]);

    const handleCountyChange = (event) => {
        const county = event.target.value;
        setSelectedCounty(county);
        setSelectedWaterSystem('');
        setSelectedPFAS('');
        setHasSelectedCounty(!!county);
        setPopupCounty(county);

        if (counties[county]) {
            setMapCenter(counties[county]);
            setZoomLevel(10);
        }
    };

    const handleMarkerClick = (county, coords) => {
        setSelectedCounty(county);
        setSelectedWaterSystem('');
        setSelectedPFAS('');
        setHasSelectedCounty(true);
        setMapCenter(coords);
        setZoomLevel(10);
        setPopupCounty(county);
    };

    const handleReset = () => {
        setSelectedCounty('');
        setSelectedWaterSystem('');
        setSelectedPFAS('');
        setHasSelectedCounty(false);
        setMapCenter(defaultCenter);
        setZoomLevel(defaultZoom);
        setPopupCounty(null);
    };

    const convertToCSV = (data) => {
        if (!data || !data.length) return '';
        const keys = Object.keys(data[0]);
        const csvRows = [];
        csvRows.push(keys.join(','));
        data.forEach(row => {
            csvRows.push(keys.map(key => `"${row[key]}"`).join(','));
        });
        return csvRows.join('\n');
    };

    const handleExportCSV = () => {
        if (filteredData.length === 0) return;

        const csv = convertToCSV(filteredData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `${selectedCounty}_Water_Quality.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className='page_container'>
            <Navbar />
            <header>
                <h1 className='page-title'>County PFA Map</h1>
            </header>

         {/* FILTERS*/}
            <div className="input-section">
                <select aria-label='select county dropdown' value={selectedCounty} onChange={handleCountyChange}>
                    <option value="">Select a County</option>
                    {Object.keys(counties).map((county) => (
                        <option key={county} value={county}>
                            {county}
                        </option>
                    ))}
                </select>

                {selectedCounty && (
                    <select aria-label='select water system dropdown' value={selectedWaterSystem} onChange={(e) => setSelectedWaterSystem(e.target.value)}>
                        <option value="">Select Water System</option>
                        {[...new Set(waterQualityData
                            .filter(entry => entry.County === selectedCounty)
                            .map(entry => entry['Water System Name'])
                        )].map((system, index) => (
                            <option key={index} value={system}>
                                {system}
                            </option>
                        ))}
                    </select>
                )}

                {selectedCounty && (
                    <select aria-label='select PFA dropdown' value={selectedPFAS} onChange={(e) => setSelectedPFAS(e.target.value)}>
                        <option value="">Select PFAS Type</option>
                        {[...new Set(waterQualityData
                            .filter(entry => entry.County === selectedCounty)
                            .map(entry => entry['PFAS Measured'])
                        )].map((pfas, index) => (
                            <option key={index} value={pfas}>
                                {pfas}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            {/* MAP COMPONENT */}
            <div className="map-container">
                <MapContainer aria-label='intereactive map displaying counties with water data' center={mapCenter} zoom={zoomLevel} className="map">
                    <MapUpdater aria-label='zoom buttons' center={mapCenter} zoom={zoomLevel} />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {Object.entries(counties).map(([county, coords]) => (
                        <Marker
                            key={county}
                            position={coords}
                            icon={dropletIcon}
                            eventHandlers={{ click: () => handleMarkerClick(county, coords) }}
                        >
                            <Popup>{county} County</Popup>
                        </Marker>
                    ))}
                    <ResetButton aria-label='reset map to origin button' onReset={handleReset} />
                </MapContainer>
            </div>

            {/* DATA TABLE OR NO DATA MESSAGE */}
            {hasSelectedCounty && (
                <div className="water-quality-data">
                    <h2>PFA Level Data</h2>
                    {filteredData.length > 0 ? (
                        <>
                            <button aria-label='csv download button' onClick={handleExportCSV} className="export-button">
                                Download Data CSV
                            </button>
                            <p id="data-message">Please download the CSV to see your results!</p>
                            <table id="data-table">
                                <thead>
                                    <tr>
                                        <th>Water System</th>
                                        <th>Source</th>
                                        <th>Testing Date</th>
                                        <th>PFAS Measured</th>
                                        <th>Result</th>
                                        <th>State Action Level (SAL)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((entry, index) => (
                                        <tr key={index}>
                                            <td>{entry['Water System Name']}</td>
                                            <td>{entry.Source}</td>
                                            <td>{entry['Testing Date']}</td>
                                            <td>{entry['PFAS Measured']}</td>
                                            <td>{entry.Result}</td>
                                            <td>{entry['State Action Level (SAL)'] || 'N/A'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <p className="no-data-message">No data available for the selected filters.</p>
                    )}
                </div>
            )}
            <Footer />
        </div>
    );
};

export default MapComponent;
