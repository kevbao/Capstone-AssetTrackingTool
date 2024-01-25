// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AssetTable from './components/AssetTable';
import NavigationBar from './components/NavigationBar';

const App = () => {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <NavigationBar />

        {/* Route Configuration */}
        <Routes>
          <Route path="/assets" element={<AssetTable />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
