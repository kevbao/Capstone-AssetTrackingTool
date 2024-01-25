import React, { useState } from 'react';
import '../assets/styles/AddLocation.css'; // CSS file for styling

const AddLocation = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Description: '',
    LocationType: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData); // Verify if the object contains the form data

    fetch('http://localhost:8081/addLocation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        // Reset form data after successful submission
        setFormData({
          Name: '',
          Description: '',
          LocationType: '',
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="location-wrapper">
      <header>
        <h1 className="title">Add New Location</h1>
      </header>
      <div className="location-container">
        <form id="newLocationForm" onSubmit={handleSubmit} className="location-form">
          <label htmlFor="locationName" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="locationName"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            className="form-input"
          />

          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <input
            type="text"
            id="description"
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            className="form-input"
          />

          <label htmlFor="locationType" className="form-label">
            Location Type:
          </label>
          <input
            type="text"
            id="locationType"
            name="LocationType"
            value={formData.LocationType}
            onChange={handleChange}
            className="form-input"
          />

          <button type="submit" className="submit-button">
            Add Location
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLocation;
