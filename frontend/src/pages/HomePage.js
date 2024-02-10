// HomePage.js - Zoe
import React from 'react';
import '../assets/styles/HomePage.css'; // CSS file for styling


const HomePage = () => 
<div className="home-container">
      <header className="header">
        <h1>Welcome to Asset Manager</h1>
        <p>A simple and efficient way to manage your assets!</p>
      </header>
      <section className="features">
        <h2>Key Features</h2>
        <ul>
          <li>Track and monitor your assets in real-time.</li>
          <li>Generate detailed reports for better insights.</li>
          <li>Intuitive user interface for easy navigation.</li>
          <li>Customizable settings to fit your needs.</li>
        </ul>
      </section>
    </div>;

export default HomePage;
