// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AddAsset from './pages/AddAsset';
import AddLocation from './pages/AddLocation';
import UserDashboard from './pages/UserDashboard';

import AssetTable from './components/AssetTable';
import NavigationBar from './components/NavigationBar';

import './assets/styles/App.css';

const App = () => {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        
        <div><NavigationBar /></div>
        <div>add spacer here</div>

        {/* Route Configuration */}
        <Routes>
          <Route path="/assets" element={<AssetTable />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddAsset />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/addlocation" element={<AddLocation />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
