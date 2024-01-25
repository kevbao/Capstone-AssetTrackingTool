// NavigationBar.js - Zoe and Stephen
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/NavigationBar.css';

const NavigationBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item"><Link to="/">Home</Link></li>
        <li className="nav-item"><Link to="/dashboard">Dashboard</Link></li>
        <li className="nav-item"><Link to="/assets">Assets</Link></li>
        <li className="nav-item"><Link to="/">Settings</Link></li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
