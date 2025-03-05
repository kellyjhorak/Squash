import React from 'react';
import Navbar from './navbar';
import Footer from './Footer';

const Resources = () => {
  return (
    <div className='page_container'>
        <Navbar />
        <header>
        <h1 className='page-title'>Filtration Types</h1>
        </header>

        <div id='resources-info'>
          <p>
            Home filtration systems are an effective method of reducing PFA levels in your drinking water. Filters that meet NSF/ANSI Standard 53 or 58 are nationally recognized in reducing chemicals in drinking water. This page will provide information on a few home filtration systems, varying in filtration ability, size, and price. We recommend choosing a filter that best matches your water system, PFA levels, and budget.
          </p>
        </div>  
        
        <div className='video-container'>
          <div id='video-sep'></div>
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/cX7kkk703sw" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
          ></iframe>
        </div>
        
        <div className='filter'>
          <div className='filter-content'>
            <h2>Carbon-Based Filtration</h2>
            <p>
              Carbon filtration systems work by trapping chemicals through absorption. The activated carbon within the filter is porous, pulling in unwanted molecules, such as PFAS, and purifying water as it passes through.
            </p>
            <h3>Install Options:</h3>
            <ul>
              <li>Point-of-Use (countertop or under the sink)</li>
              <li>Whole-House Filtration System</li>
              <li>Inline Filter for Fridge/Water Dispenser</li>
            </ul> 
          </div>
          <img src="/src/images/carbon-filtration.png" alt="graphic of carbon filter" className="filter-image" />
        </div>

        <div className='filter'>
          <div className='filter-content'> 
            <h2>Reverse Osmosis</h2>
            <p>
              Reverse osmosis systems work by forcing water through a semipermeable membrane within the filter. The membrane has small pores, filtering out larger contaminants and trapping them within the membrane. The membrane effectively targets a wide range of PFAs, filtering and purifying water as it passes through the system.
            </p>
            <h3>Install Options:</h3>
            <ul>
              <li>Point-of-Use (countertop or under the sink)</li>
              <li>Inline Filter for Fridge/Water Dispenser</li>
            </ul>
          </div>  
          <img src="/src/images/reverse-osmosis.png" alt="graphic of reverse osmosis filter" className="filter-image" />
        </div>

        <div className='filter'>
          <div className='filter-content'>
            <h2>Ion Exchange</h2>   
            <p>
              Ion exchange works by utilizing positively charged resin beads to bind to negatively charged contaminants in the water. The resin beads work like magnets, attracting and preventing PFAs and other chemicals from passing through the filter.
            </p>
            <h3>Install Options:</h3>
            <ul>
              <li>Point-of-Use (countertop or under the sink)</li>
              <li>Whole-House Filtration System</li>     
            </ul>
          </div>  
          <img src="/src/images/ion-exchange-no-bg.png" alt="graphic of ion exchange filter" className="filter-image" />
        </div>

        <Footer />
    </div>  
  );
};

export default Resources;
