import React, { useState } from 'react';
import '../assets/styles/AddAsset.css'; // CSS file for styling

const AssetForm = () => {
  const [formData, setFormData] = useState({
    Asset_Name: '',
    Asset_Tag: '',
    VersionHistory: '',
    Current_Image: '',
    Model: '',
    Type: '',
    Category: '',
    Status: '',
    Purchase_Date: '',
    Cost: '',
    Deployed: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData); // Verify if the object contains the form data

    fetch('http://localhost:8081/addAsset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        // Reset form data after successful submission
        setFormData({
          Asset_Name: '',
          Asset_Tag: '',
          VersionHistory: '',
          Current_Image: '',
          Model: '',
          Type: '',
          Category: '',
          Status: '',
          Purchase_Date: '',
          Cost: '',
          Deployed: ''
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="asset-wrapper">
      <header className="asset-header">
        <h1 className="asset-h1">Asset Management</h1>
      </header>
      <div className="asset-container">
        <h2 className="asset-h2">Add New Asset</h2>
        <form id="newAssetForm" onSubmit={handleSubmit}>
          {/* Add event listeners to update state on input change */}
          {Object.keys(formData).map((key) => (
            <div key={key} className="asset-form-group">
              <label htmlFor={key} className="asset-label">
                {key.replace(/_/g, ' ')}
              </label>
              <input
                type="text"
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="asset-input"
              />
            </div>
          ))}
          <button type="submit" className="asset-submit-button">
            Add Asset
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssetForm;
