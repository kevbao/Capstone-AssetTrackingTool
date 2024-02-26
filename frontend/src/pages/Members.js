// Members.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Members.css';

const MemberTable = () => {
  const [search, setSearch] = useState('');
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/Member')
      .then(res => res.json())
      .then(data => {
        setMembers(data);
        setFilteredMembers(data);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const filtered = members.filter(member =>
      member.Name.toLowerCase().includes(search)
    );
    setFilteredMembers(filtered);
  }, [search, members]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  return (
    <div className="member-table-container">
      <div><Link to="/addMember" className="addmember-btn">Add New User</Link></div>
      <h1>Members</h1>
      {/* Search input */}
      <input
        type="text"
        id="searchInput"
        placeholder="Search by Member Name"
        value={search}
        onChange={handleSearchChange}
      />
      <table className="member-table">
        <thead>
          <tr>
            <th>GD_id</th>
            <th>Name</th>
            <th>Permissions</th>
            <th>Email</th>
            <th>History</th>
            <th>Department</th>
            <th>Manager</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member, index) => (
            <tr key={index}>
              <td>{member.GD_id}</td>
              <td>{member.Name}</td>
              <td>{member.Permissions}</td>
              <td>{member.Email}</td>
              <td>{member.History}</td>
              <td>{member.Department}</td>
              <td>{member.Manager}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberTable;
