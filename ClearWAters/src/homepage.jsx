import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Navbar from './navbar';
import Footer from './Footer';

const PfasData = ({ countyInput, onBack }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      year = '20' + year; // convert e.g., "23" to "2023"
    }
    return new Date(year, parts[0] - 1, parts[1]);
  };

  // Group by PFAS Measured and pick the row with the most recent Testing Date for each PFAS
  const mostRecentDataByPFAS = filteredData.reduce((acc, curr) => {
    const pfa = curr["PFAS Measured"];
    const currDate = parseDate(curr["Testing Date"]);
    if (!acc[pfa] || currDate > parseDate(acc[pfa]["Testing Date"])) {
      acc[pfa] = curr;
    }
    return acc;
  }, {});

  const mostRecentData = Object.values(mostRecentDataByPFAS);

  // Print the count to the console
  console.log(`Number of PFAS returned for ${countyInput}: ${mostRecentData.length}`);

  return (
    <div>
      <header style={{ display: 'flex', alignItems: 'center' }}>
        <button
          onClick={onBack}
          style={{ fontSize: '1em', padding: '10px', marginRight: '15px' }}
        >
          Back
        </button>
      </header>
      <main>
        <div className="container">
          <div id="data-section">
            {/* Display the count on the UI */}
            <p>{mostRecentData.length} PFAS entries found for {countyInput} county.</p>
            <table>
              <thead>
                <tr>
                  <th>Water System Name</th>
                  <th>Source</th>
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
                    <td>{item["Water System Name"]}</td>
                    <td>{item.Source}</td>
                    <td>{item.County}</td>
                    <td>{item["Testing Date"]}</td>
                    <td>{item["PFAS Measured"]}</td>
                    <td>{item.Result}</td>
                    <td>{item["State Action Level (SAL)"]}</td>
                    <td>{item["Calculation_result_range_bins_text"]}</td>
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

  // Adjust the county list as needed based on your dataset
  const counties = ["Kitsap", "King", "Pierce", "Spokane", "Yakima"];

  return (
    <div>
      <Navbar />
      <div className="homepage">
        <header>
          <h1>PFAS Contamination Data</h1>
        </header>
        <div className="Main_info"> 
          <h2>What is a PFA?</h2>
          <p>PFAs (per- and polyfluoroalkyl sustance) are a category of man-made harmful chemicals. PFA's can be found in a wide variety of items, such as homewears, clothing, and medical equipment. These chemicals do not break down, so they find themselves in places like our watershed from dumping, manufacturing, and leaching. </p>
        </div>
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
                  <option key={county} value={county}>
                    {county}
                  </option>
                ))}
              </select>
              <button
                onClick={handleSearch}
                style={{ fontSize: '1.2em', padding: '10px', marginLeft: '15px' }}
              >
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
