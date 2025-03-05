import React, { useState, useEffect } from 'react';
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

  // Load main dataset from JSON (home-map-final.json)
  useEffect(() => {
    setLoading(true);
    fetch('../../DATA/home-map-final.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(jsonData => {
        setData(jsonData);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  // Load PFA descriptions from new JSON file (PFA_contaminents.json)
  useEffect(() => {
    fetch('../../DATA/PFA_contaminents.json')
      .then(response => response.json())
      .then(jsonData => {
        // Create a lookup object by CompoundName
        const mapping = {};
        jsonData.forEach(item => {
          mapping[item.CompoundName] = item;
        });
        setPfaDescriptions(mapping);
      })
      .catch(err => console.error('Error loading PFA descriptions:', err));
  }, []);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Filter for selected county
  const filteredData = data.filter(item => item.County === countyInput);
  if (filteredData.length === 0) {
    return <p className="no-results">No data found for "{countyInput}"</p>;
  }

  // Parse the date in MM/DD/YY format
  const parseDate = (dateString) => {
    const parts = dateString.split('/');
    let year = parts[2];
    if (year.length === 2) {
      year = '20' + year;
    }
    return new Date(year, parts[0] - 1, parts[1]);
  };

  // Helper to extract PFAS label (removes parentheses)
  const extractLabel = (pfasName) => {
    const match = pfasName.match(/\(([^)]+)\)/);
    return match ? match[1] : pfasName;
  };

  // Group by PFAS Measured and pick the most recent Testing Date
  const mostRecentDataByPFAS = filteredData.reduce((acc, curr) => {
    const pfa = curr["PFAS Measured"];
    const currDate = parseDate(curr["Testing Date"]);
    if (!acc[pfa] || currDate > parseDate(acc[pfa]["Testing Date"])) {
      acc[pfa] = curr;
    }
    return acc;
  }, {});
  const mostRecentData = Object.values(mostRecentDataByPFAS);

  // Tooltip handler when hovering over small circles
  const handleMouseEnter = (e, pfaName) => {
    const rect = e.target.getBoundingClientRect();
    const container = document.getElementById('tooltip-container');
    const containerRect = container.getBoundingClientRect();
    const x = rect.left + rect.width / 2 - containerRect.left;
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

  return (
    <div id="tooltip-container" style={{ position: 'relative' }}>
      <header>
        <button onClick={onBack} className="back-button">Back</button>
      </header>
      <main>
        <div className="container">
          <div className="pfas-container">
            <div className="big-circle">
              <span className="big-number">{mostRecentData.length}</span>
              <span className="big-label">PFAs detected</span>
            </div>
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
        {tooltip.visible && (
          <div className="tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
            <p>{tooltip.content.Description}</p>
            <p><strong>State Action Level:</strong> {tooltip.content.StateActionLevel} ng/L</p>
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

  const counties = ["Kitsap", "King", "Pierce", "Spokane", "Yakima"];

  return (
    <div className='page_container'>
      <Navbar />
      <header>
        <h1 className='page-title'>{showData ? `${countyInput} PFA Contamination Data` : "County PFA Contamination Data"}</h1>
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
      <Footer />
    </div>
  );
}
