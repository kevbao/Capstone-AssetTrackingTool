import React, { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState([])
  useEffect(()=> {
    fetch('http://localhost:8081/Asset') //App runs on localhost:3000, database is on localhost:8081, both have to be running in 2 different terminals.
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.log(err));
  }, [])
  return (
    <div style = {{padding: "50px"}}>
      <table>
        <thead>
          <th>Asset_ID</th>
          <th>Asset_Name</th>
          <th>Asset_Tag</th>
          <th>VersionHistory</th>
          <th>Current_Image</th>
          <th>Model</th>
          <th>Type</th>
          <th>AssetTag</th>
          <th>Category</th>
          <th>Status</th>
          <th>Purchase_Date</th>
          <th>Cost</th>
          <th>Deployed</th>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.Asset_ID}</td>
              <td>{d.Asset_Name}</td>
              <td>{d.Asset_Tag}</td>
              <td>{d.VersionHistory}</td>
              <td>{d.Current_Image}</td>
              <td>{d.Model}</td>
              <td>{d.Type}</td>
              <td>{d.AssetTag}</td>
              <td>{d.Category}</td>
              <td>{d.Status}</td>
              <td>{d.Purchase_Date}</td>
              <td>{d.Cost}</td>
              <td>{d.Deployed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App