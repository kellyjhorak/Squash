import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Navbar from './navbar';
import Footer from './Footer';

const PfasData = ({ countyInput, onBack }) => {
  const [data, setData] = useState([]);
  const [pfaDescriptions, setPfaDescriptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: null,
    x: 0,
    y: 0
  });

  // Load main dataset
  useEffect(() => {
    Papa.parse('../../DATA/home_map_dataset.csv', {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: function (results) {
        setData(results.data);
        setLoading(false);
      },
      error: function (err) {
        setError(err);
        setLoading(false);
      }
    });
  }, []);

  // Load PFA descriptions dataset
  useEffect(() => {
    Papa.parse('../../DATA/PFA-descriptions.csv', {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: function (results) {
        // Create a lookup table by CompoundName
        const mapping = {};
        results.data.forEach(item => {
          mapping[item.CompoundName] = item;
        });
        setPfaDescriptions(mapping);
      },
      error: function (err) {
        console.error('Error loading PFA descriptions:', err);
      }
    });
  }, []);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Filter for the selected county
  const filteredData = data.filter(item => item.County === countyInput);
  if (filteredData.length === 0) {
    return <p className="no-results">No data found for "{countyInput}"</p>;
  }

  // Helper function to parse dates in MM/DD/YY format
  const parseDate = (dateString) => {
    const parts = dateString.split('/');
    let year = parts[2];
    if (year.length === 2) {
      year = '20' + year;
    }
    return new Date(year, parts[0] - 1, parts[1]);
  };

  // Helper to extract label from PFAS Measured (removing parentheses)
  const extractLabel = (pfasName) => {
    const match = pfasName.match(/\(([^)]+)\)/);
    return match ? match[1] : pfasName;
  };

  // Group by PFAS Measured and pick the row with the most recent Testing Date
  const mostRecentDataByPFAS = filteredData.reduce((acc, curr) => {
    const pfa = curr["PFAS Measured"];
    const currDate = parseDate(curr["Testing Date"]);
    if (!acc[pfa] || currDate > parseDate(acc[pfa]["Testing Date"])) {
      acc[pfa] = curr;
    }
    return acc;
  }, {});
  const mostRecentData = Object.values(mostRecentDataByPFAS);

  // When a user hovers over a small circle, show a tooltip relative to the container
  const handleMouseEnter = (e, pfaName) => {
    const rect = e.target.getBoundingClientRect();
    const container = document.getElementById('tooltip-container');
    const containerRect = container.getBoundingClientRect();
    // Set x to the horizontal center of the small circle relative to the container
    const x = rect.left + rect.width / 2 - containerRect.left;
    // Set y so that the tooltip appears above the circle (adjust the offset as needed)
    const y = rect.top - containerRect.top - 5;
    const description = pfaDescriptions[pfaName];
    if (description) {
      setTooltip({
        visible: true,
        content: description,
        x,
        y
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  console.log(`Number of PFAS returned for ${countyInput}: ${mostRecentData.length}`);

  return (
    // Use a container with an ID for relative positioning
    <div id="tooltip-container" style={{ position: 'relative' }}>
      <header>
        <button onClick={onBack} className="back-button">
          Back
        </button>
      </header>
      <main>
        <div className="container">
          <div className="pfas-container">
            {/* Big circle displaying the PFAS count */}
            <div className="big-circle">
              <span className="big-number">{mostRecentData.length}</span>
              <span className="big-label">PFAs detected</span>
            </div>
            {/* Small circles for each PFAS with hover handlers */}
            <div className="small-circles-container">
              {mostRecentData.map((item, index) => {
                const label = extractLabel(item["PFAS Measured"]);
                return (
                  <div
                    key={index}
                    className="small-circle"
                    onMouseEnter={(e) => handleMouseEnter(e, label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Tooltip Popup */}
        {tooltip.visible && (
          <div
            className="tooltip"
            style={{
              left: tooltip.x,
              top: tooltip.y,
            }}
          >
            <p>{tooltip.content.Description}</p>
            <p><strong>State Action Level:</strong> {tooltip.content.StateActionLevel}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default function Homepage() {
  const [countyInput, setCountyInput] = useState('');
  const [showData, setShowData] = useState(false);

  const handleSelectChange = (e) => {
    setCountyInput(e.target.value);
  };

  const handleSearch = () => {
    if (countyInput) {
      setShowData(true);
    }
  };

  const handleBack = () => {
    setShowData(false);
    setCountyInput('');
  };

  // List of counties based on your dataset
  const counties = ["Kitsap", "King", "Pierce", "Spokane", "Yakima"];

  return (
    <div>
      <Navbar />
      <div className="homepage">
      <header>
        <h1>{showData ? `${countyInput} PFA Contamination Data` : "County PFA Contamination Data"}</h1>
      </header>
        <div id="main_info" style={{ display: showData ? 'none' : 'block' }}>
          <h2>What is a PFA?</h2>
          <p>
            PFAs (per- and polyfluoroalkyl substances) are man-made harmful chemicals found in a wide range of products.
            They are persistent in the environment and can be released through manufacturing, waste disposal, and leaching.
          </p>
        </div>
        <main>
          {!showData ? (
            <div className="input-section">
              <select id="county-select" value={countyInput} onChange={handleSelectChange}>
                <option value="">Select a County</option>
                {counties.map(county => (
                  <option key={county} value={county}>
                    {county}
                  </option>
                ))}
              </select>
              <button id="go-button" onClick={handleSearch}>
                GO
              </button>
            </div>
          ) : (
            <PfasData countyInput={countyInput} onBack={handleBack} />
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
