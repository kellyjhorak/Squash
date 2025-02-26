import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Navbar from './navbar';
import Footer from './Footer';

const PfasData = ({ countyInput, onBack }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Papa.parse('../../DATA/MAP.csv', {
      header: true,
      download: true,
      complete: function(results) {
        setData(results.data);
        setLoading(false);
      },
      error: function(err) {
        setError(err);
        setLoading(false);
      }
    });
  }, []);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Filter data for the selected county
  const filteredData = data.filter(item => item.County === countyInput);

  if (filteredData.length === 0) {
    return <p className="no-results">No data found for "{countyInput}"</p>;
  }

  // Helper function to parse dates from MM/DD/YYYY format
  const parseDate = (dateString) => {
    const [month, day, year] = dateString.split('/');
    return new Date(year, month - 1, day);
  };

  // Group the data by PFAS measured and keep only the row with the most recent testing date for each PFAS
  const mostRecentDataByPFAS = filteredData.reduce((acc, curr) => {
    const pfaKey = curr["PFAS Measured"];
    const currDate = parseDate(curr["Testing Date"]);
    if (!acc[pfaKey] || currDate > parseDate(acc[pfaKey]["Testing Date"])) {
      acc[pfaKey] = curr;
    }
    return acc;
  }, {});

  const mostRecentData = Object.values(mostRecentDataByPFAS);

  return (
    <div>
      <header style={{ display: 'flex', alignItems: 'center' }}>
        <button onClick={onBack} style={{ fontSize: '1em', padding: '10px', marginRight: '15px' }}>
          Back
        </button>
      </header>

      <main>
        <div className="container">
          <div id="data-section">
            <table>
              <thead>
                <tr>
                  <th>Water System ID</th>
                  <th>Water System Name</th>
                  <th>County</th>
                  <th>Testing Date</th>
                  <th>PFAS Measured</th>
                  <th>Result</th>
                  <th>State Action Level (SAL)</th>
                  <th>Calculation Result</th>
                </tr>
              </thead>
              <tbody>
                {mostRecentData.map((item, index) => (
                  <tr key={index}>
                    <td>{item["Water System ID"]}</td>
                    <td>{item["Water System Name"]}</td>
                    <td>{item.County}</td>
                    <td>{item["Testing Date"]}</td>
                    <td>{item["PFAS Measured"]}</td>
                    <td>{item.Result}</td>
                    <td>{item["State Action Level (SAL)"]}</td>
                    <td>{item.Calculation_result_range_bins_text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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

  // Adjust the counties list if needed to match the CSV data exactly
  const counties = ["Kitsap", "King", "Pierce", "Spokane", "Yakima"];

  return (
    <div>
      <Navbar />
      <div className="homepage">
        <header>
          <h1>PFAS Contamination Data</h1>
        </header>

        <main>
          {!showData ? (
            <div className="input-section">
              <select
                id="county-select"
                value={countyInput}
                onChange={handleSelectChange}
                style={{ fontSize: '1.2em', padding: '13px', width: '400px' }}
              >
                <option value="">Select a County</option>
                {counties.map(county => (
                  <option key={county} value={county}>{county}</option>
                ))}
              </select>
              <button onClick={handleSearch} style={{ fontSize: '1.2em', padding: '10px', marginLeft: '15px' }}>
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
