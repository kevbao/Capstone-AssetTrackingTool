// AssetTable.js
import React, { useEffect, useState } from 'react';
import '../assets/styles/AssetTable.css';

const AssetTable = () => {

  // Constants for displaying update modal - Might want to change from a modal
  const [data, setData] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  //Constants for searching
  const [selectedColumn, setSelectedColumn] = useState('Asset_Name');
  const [search, setSearch] = useState('');
  //Constants for checking out
  const [checkoutAssetID, setCheckoutAssetID] = useState(null);
  const [checkoutMemberID, setCheckoutMemberID] = useState('');

  useEffect(() => {
    fetch('http://localhost:8081/Asset')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);
  
  //Delete asset call to backend
  const deleteAsset = (assetID) => {
    console.log(`Delete button clicked for asset ID: ${assetID}`);
    fetch(`http://localhost:8081/deleteAsset/${assetID}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        fetchAssetData();
      })
      .catch((err) => console.error(err));
  };

  // Grab the asset to be updated
  const updateAsset = (assetID) => {
    console.log(`Update button clicked for asset ID: ${assetID}`);
    const selected = data.find((asset) => asset.Asset_ID === assetID);
    setSelectedAsset(selected);
    setShowUpdateModal(true);
  };

  //Closing modal (update form)
  const closeUpdateModal = () => {
    setShowUpdateModal(false);
  };

  // Update asset call to backend 
  const handleUpdateSubmit = (updatedData) => {
    fetch(`http://localhost:8081/updateAsset/${selectedAsset.Asset_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        closeUpdateModal();
        fetchAssetData();
      })
      .catch((err) => console.error(err));
  };

  //Fetch data for table (might be redundant with the useEffect() at the top)
  const fetchAssetData = () => {
    fetch('http://localhost:8081/Asset')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  };
  
  //More searching functions ***************************
  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleColumnChange = (e) => {
    setSelectedColumn(e.target.value);
  };

  const filterData = () => {
    return data.filter((item) =>
      item[selectedColumn].toLowerCase().includes(search)
    );
  };
 //*************************************************** 

 const handleCheckout = (assetID) => {
    setCheckoutAssetID(assetID);
  };

  // Function to handle checkout
  const handleCheckoutConfirm = () => {
    // Send a request to the backend to update the Member_ID of the selected asset
    fetch(`http://localhost:8081/checkoutAsset/${checkoutAssetID}/${checkoutMemberID}`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        setCheckoutAssetID(null); // Reset checkout state
        setCheckoutMemberID('');
        fetchAssetData(); // Refresh asset data
      })
      .catch((err) => console.error(err));
  };
  //Function to handle checkin 
  const handleCheckin = (assetID) => {
    // Call the backend to update the Member_ID to null
    fetch(`http://localhost:8081/checkinAsset/${assetID}`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        fetchAssetData(); // Refresh the asset data after checkin
      })
      .catch((err) => console.error(err));
  };
 
  return (
    <div className="table-container">
      {/* Search Bar */}
      <div>
        <input
          type="text"
          id="searchInput"
          placeholder="Search..."
          onChange={handleSearch}
        />
        <select onChange={handleColumnChange} value={selectedColumn}>
          <option value="Asset_ID">Asset ID</option>
          <option value="Asset_Name">Asset Name</option>
          <option value="Asset_Tag">Asset Tag</option>
          <option value="VersionHistory">Version History</option>
          <option value="Current_Image">Current Image</option>
          <option value="Model">Model</option>
          <option value="Type">Type</option>
          <option value="Category">Category</option>
          <option value="Status">Status</option>
          <option value="Purchase_Date">Purchase Date</option>
          <option value="Cost">Cost</option>
          <option value="Deployed">Deployed</option>
        </select>
      </div>
  
      {/* Asset Table */}
      <table className="asset-table">
        <thead>
          <tr>
            <th>Asset ID</th>
            <th>Asset Name</th>
            <th>Asset Tag</th>
            <th>Version History</th>
            <th>Current Image</th>
            <th>Model</th>
            <th>Type</th>
            <th>Category</th>
            <th>Status</th>
            <th>Purchase Date</th>
            <th>Cost</th>
            <th>Deployed</th>
            <th>Checked out to</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) &&
            data.length > 0 &&
            filterData().map((d, i) => (
              <tr key={i}>
                <td>{d.Asset_ID}</td>
                <td>{d.Asset_Name}</td>
                <td>{d.Asset_Tag}</td>
                <td>{d.VersionHistory}</td>
                <td>{d.Current_Image}</td>
                <td>{d.Model}</td>
                <td>{d.Type}</td>
                <td>{d.Category}</td>
                <td>{d.Status}</td>
                <td>{d.Purchase_Date}</td>
                <td>{d.Cost}</td>
                <td>{d.Deployed}</td>
                <td>{d.Member_ID ? d.Member_ID : ''}</td>
                <td>
                  <button onClick={() => deleteAsset(d.Asset_ID)}>Delete</button>
                  <button onClick={() => updateAsset(d.Asset_ID)}>Update</button>
                  {d.Member_ID ? (
                  <button onClick={() => handleCheckin(d.Asset_ID)}>Checkin</button>
                ) : (
                  <button onClick={() => handleCheckout(d.Asset_ID)}>Checkout</button>
                )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Update Asset Modal */}
      {showUpdateModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeUpdateModal}>
              &times;
            </span>
            {/* Form for updating asset attributes */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const updatedData = {};
                formData.forEach((value, key) => {
                  updatedData[key] = value;
                });
                handleUpdateSubmit(updatedData);
              }}
            >
              <label>Asset Name: </label>
              <input type="text" name="Asset_Name" defaultValue={selectedAsset?.Asset_Name} required />

              <label>Asset Tag: </label>
              <input type="text" name="Asset_Tag" defaultValue={selectedAsset?.Asset_Tag} required />

              <label>Version History: </label>
              <input type="text" name="VersionHistory" defaultValue={selectedAsset?.VersionHistory} required />

              <label>Current Image: </label>
              <input type="text" name="Current_Image" defaultValue={selectedAsset?.Current_Image} required />

              <label>Model: </label>
              <input type="text" name="Model" defaultValue={selectedAsset?.Model} required />

              <label>Type: </label>
              <input type="text" name="Type" defaultValue={selectedAsset?.Type} required />

              <label>Category: </label>
              <input type="text" name="Category" defaultValue={selectedAsset?.Category} required />

              <label>Status: </label>
              <input type="text" name="Status" defaultValue={selectedAsset?.Status} required />

              <label>Purchase Date: </label>
              <input type="text" name="Purchase_Date" defaultValue={selectedAsset?.Purchase_Date} required />

              <label>Cost: </label>
              <input type="text" name="Cost" defaultValue={selectedAsset?.Cost} required />

              <label>Deployed: </label>
              <input type="text" name="Deployed" defaultValue={selectedAsset?.Deployed} required />

              <button type="submit">Update Asset</button>
            </form>
          </div>
        </div>
      )}
      {/* Checkout Confirmation Modal */}
      {checkoutAssetID && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setCheckoutAssetID(null)}>
              &times;
            </span>
            <p>Enter Member ID for checkout:</p>
            <input
              type="text"
              value={checkoutMemberID}
              onChange={(e) => setCheckoutMemberID(e.target.value)}
            />
            <button onClick={handleCheckoutConfirm}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetTable;
