{/* this will be the landing page where users type in their zipcode*/} 


import React, { useState } from 'react';
import Navbar from './navbar';
import Footer from './Footer';

const counties = ["King", "Kitsap", "Pierce", "Spokane", "Yakima"];

const PfasData = ({ countyInput }) => {
  const data = [
    { county_name: "King", measurement_date: "3/15/2022", pfas_level: 14.32, pfas_compound: "(PFOS) PFoctane sulfonic acid", water_source: "Cedar River", recommended_filter: "Activated Carbon", comments: "PFOS levels slightly elevated; filtration recommended." },
    { county_name: "Kitsap", measurement_date: "11/7/2023", pfas_level: 15.32, pfas_compound: "(PFOS) PFoctane sulfonic acid", water_source: "Puget Sound", recommended_filter: "Activated Carbon", comments: "Detected at concerning levels; filtration strongly recommended." },
    { county_name: "Pierce", measurement_date: "7/11/2023", pfas_level: 14.85, pfas_compound: "(PFOS) PFoctane sulfonic acid", water_source: "Puyallup River", recommended_filter: "Activated Carbon", comments: "Detected at concerning levels; filtration is strongly recommended." },
    { county_name: "Spokane", measurement_date: "4/8/2024", pfas_level: 42.1, pfas_compound: "(PFOS) PFoctane sulfonic acid", water_source: "Spokane River", recommended_filter: "Activated Carbon", comments: "High levels detected; filtration is strongly recommended." },
    { county_name: "Yakima", measurement_date: "4/8/2024", pfas_level: 45.2, pfas_compound: "(PFOS) PFoctane sulfonic acid", water_source: "Yakima River", recommended_filter: "Activated Carbon", comments: "High PFOS levels; filtration strongly recommended." }
  ];

  const filteredData = data.filter(item => item.county_name === countyInput);

  return (
    <div>
      <header>
        <h1>PFAS Contamination Data</h1>
      </header>

      <main>
        <div className="container">
          <div id="data-section">
            {filteredData.length === 0 ? (
              <p className="no-results">No data found for "{countyInput}"</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>County</th>
                    <th>Measurement Date</th>
                    <th>PFAS Compound</th>
                    <th>Water Source</th>
                    <th>PFAS Level</th>
                    <th>Recommended Filter</th>
                    <th>Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map(item => (
                    <tr key={item.county_name}>
                      <td>{item.county_name}</td>
                      <td>{item.measurement_date}</td>
                      <td>{item.pfas_compound}</td>
                      <td>{item.water_source}</td>
                      <td>{item.pfas_level}</td>
                      <td>{item.recommended_filter}</td>
                      <td>{item.comments}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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
                style={{ fontSize: '1.2em', padding: '10px', width: '250px' }}
              >
                <option value="">Select a County</option>
                {counties.map(county => (
                  <option key={county} value={county}>{county}</option>
                ))}
              </select>
              <button onClick={handleSearch} style={{ fontSize: '1.2em', padding: '10px', marginLeft: '10px' }}>GO</button>
            </div>
          ) : (
            <PfasData countyInput={countyInput} />
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
