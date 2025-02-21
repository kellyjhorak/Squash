import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Ensure correct imports
import Homepage from './homepage';  // Import Homepage
import Map from './Map';
import Resources from './resources';

{/*
  
*/}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} /> 
        <Route path="/homepage" element={<Homepage />} /> 
        <Route path="/map" element={<Map />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </Router>
  );
};

export default App;
