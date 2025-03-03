// resources.jsx
import React from 'react';
import Navbar from './navbar';
import Footer from './Footer';

const Resources = () => {
  return (
    <div>
        <Navbar />

          <div id='resources-info'>
            <p>
              Home filtration systems are an effective method of reducing PFA levels in your drinking water. Filters that meet NSF/ANSI Standard 53 or 58 are nationally recognized in reducing chemicals in drinking water. This page will provide information on a few home filtration systems, varying in filtration ability, size, and price. We recommend choosing a filter that best matches your water system, PFA levels, and budget.
            </p>
          </div>  
          <h1>Filtration Types</h1>
          
          <div className='filter'>
            <div className='filter-content'>
              <h2>Carbon-Based Filtration</h2>
              <p>Filtration description...</p>
              <h3>Install Options:</h3>
              <ul>
                <li>
                Point-of-Use (countertop or under the sink)
                </li>
                <li>
                Whole-House Filtration System
                </li>
                <li>
                Inline Filter for Fridge/Water Despenser
                </li>
              </ul> 
            </div>
            <img src="/src/images/carbon-filtration.png" alt="Image" class="filter-image" />
          </div>

          <div className='filter'>
            <div className='filter-content'> 
            <h2>Reverse Osmosis</h2>
              <p>Filtration description...</p>
              <h3>Install Options:</h3>
              <ul>
                <li>
                Point-of-Use (countertop or under the sink)
                </li>
                <li>
                Inline Filter for Fridge/Water Despenser
                </li>
              </ul>
            </div>  
            <img src="/src/images/reverse-osmosis.png" alt="Image" class="filter-image" />
          </div>

          <div className='filter'>
            <div className='filter-content'>
            <h2>Ion Exchange</h2>   
              <p>Filtration description...</p>
              <h3>Install Options:</h3>
              <ul>
                <li>
                Point-of-Use (countertop or under the sink)
                </li>
                <li>
                Whole-House Filtration System
                </li>     
              </ul>
            </div>  
            <img src="/src/images/ion-exchange-no-bg.png" alt="Image" class="filter-image" />
          </div>

        <Footer />
    </div>  
  );
};

export default Resources;  // This makes Resources the default export
