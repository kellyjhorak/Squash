import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Ensure correct imports
import Navbar from './navbar';
import Homepage from './Homepage';  // Import Homepage

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />  
      </Routes>
    </Router>
  );
};

export default App;
