import React, { useState } from 'react';
import '../assets/styles/AddMember.css'; // CSS file for styling

const MemberForm = () => {
  const [formData, setFormData] = useState({
    GD_id: '',
    Name: '',
    Permissions: '',
    Email: '',
    History: '',
    Department: '',
    Manager: '',
    Check_in_time: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData); // Verify if the object contains the form data

    fetch('http://localhost:8081/addMember', {
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
            GD_id: '',
            Name: '',
            Permissions: '',
            Email: '',
            History: '',
            Department: '',
            Manager: '',
            Check_in_time: '',
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="member-wrapper">
      <header className="member-header">
        <h1 className="member-h1">Add New User</h1>
      </header>
      <div className="member-container">
        <h2 className="member-h2">Add New User</h2>
        <form id="newmemberForm" onSubmit={handleSubmit}>
          {/* Add event listeners to update state on input change */}
          {Object.keys(formData).map((key) => (
            <div key={key} className="member-form-group">
              <label htmlFor={key} className="member-label">
                {key.replace(/_/g, ' ')}
              </label>
              <input
                type="text"
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="member-input"
              />
            </div>
          ))}
          <button type="submit" className="member-submit-button">
            Add Member
          </button>
        </form>
      </div>
    </div>
  );
};

export default MemberForm;