import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/UserDashboard.css';

const UserDashboard = () => {
  const [locations, setLocations] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Fetch Locations
    fetch('http://localhost:8081/Location')
      .then((res) => res.json())
      .then((data) => setLocations(data))
      .catch((err) => console.error(err));

    // Fetch History
    fetch('http://localhost:8081/History')
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <header className="dashboard-header">
        <h1 className="dashboard-h1">User Dashboard</h1>
      </header>

      <div className="dashboard-container">
        <h2 className="dashboard-h2">Asset List</h2>

        {/* Search Bar */}
        <input type="text" className="dashboard-search-bar" placeholder="Search for assets..." />

        <Link to="/add" className="dashboard-btn">Add New Asset</Link>

        {/* Recent Activity */}
        <div className="dashboard-recent-activity">
          <h2>Recent Activity</h2>
          <table className="dashboard-location-table">
          <thead>
            <tr>
              <th className="dashboard-location-table-th">Action Description</th>
              <th className="dashboard-location-table-th">Date Time</th>
            </tr>
          </thead>
          <tbody>
            {history.map((activity) => (
              <tr key={activity.id}>
                <td className="dashboard-location-table-td">{activity.Action_Description}</td>
                <td className="dashboard-location-table-td">{activity.DateTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        {/* Location Table */}
        <Link to="/addlocation" className="dashboard-btn">Add New Location</Link>
        <h2>Locations</h2>
        <table className="dashboard-location-table">
          <thead>
            <tr>
              <th className="dashboard-location-table-th">Name</th>
              <th className="dashboard-location-table-th">Description</th>
              <th className="dashboard-location-table-th">LocationType</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location) => (
              <tr key={location.id}>
                <td className="dashboard-location-table-td">{location.Name}</td>
                <td className="dashboard-location-table-td">{location.Description}</td>
                <td className="dashboard-location-table-td">{location.LocationType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;