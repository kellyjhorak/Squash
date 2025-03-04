import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Ensure correct imports
import Homepage from './homepage';  // Import Homepage
import Map from './Map';
import Resources from './resources';

{/*
  this is a comment for firebase testing]
  naother comment
this is a comment for sophia
  this is a comment for kelly!!!!
  this is another comment for sophia
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
