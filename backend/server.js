//THIS IS THE BACKEND SERVER
//********************************************************************************************* 
// DECLARE CONSTANTS AND DATABASE CONNECTIONS 
// ********************************************************************************************
const express = require('express');
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors())

app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies

const port = 8081

/*in order to get this to work: run these in terminal:
mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
FLUSH PRIVILEGES;
exit
*/
const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '', //set password to empty for your mysql root user as well, see above comment
    database: 'asset_tracking' // change this to the name of your own schema which should be asset_tracking
})

// LANDING PAGE FOR BACKEND SERVER (change all app.get to stylize server to more than just json)
app.get('/', (req, res) => {
    const welcomeMessage = `
        <html>
            <head>
                <title>Welcome to Asset Tracking Server</title>
            </head>
            <body>
                <h1>Welcome to Asset Tracking Server</h1>
                <p>This is the backend server for the Asset Tracking application. You can use the following endpoints:</p>
                <ul>
                    <li><a href="/Asset">View Assets</a></li>
                    <li><a href="/Member">View Members</a></li>
                    <li><a href="/Location">View Locations</a></li>
                    <li><a href="/Accessory">View Accessories</a></li>
                </ul>
            </body>
        </html>
    `;
    res.send(welcomeMessage);
});


// ******************************************************************************************
// RETRIEVE ALL DATA FROM TABLES 
// ******************************************************************************************
app.get('/Asset', (req, res) => {
    const sql = "SELECT * FROM Asset";
    db.query(sql, (err, data) => {
        if(err) {
            console.error('Database query error:', err);
            return res.status(500).send('<p>Error retrieving data from the database</p>');
        }

        // Convert the data to an HTML table
        const tableRows = data.map(asset => {
            return `<tr>
                        <td>${asset.Asset_ID}</td>
                        <td>${asset.Asset_Name}</td>
                        <td>${asset.Asset_Tag}</td>
                        <td>${asset.VersionHistory}</td>
                        <td>${asset.Current_Image}</td>
                        <td>${asset.Model}</td>
                        <td>${asset.Type}</td>
                        <td>${asset.Category}</td>
                        <td>${asset.Status}</td>
                        <td>${asset.Purchase_Date}</td>
                        <td>${asset.Cost}</td>
                        <td>${asset.Deployed}</td>
                        <td>${asset.Member_ID}</td>
                        <!-- Add more columns as needed -->
                    </tr>`;
        });

        // Create the HTML table
        const assetTable = `
            <html>
                <head>
                    <title>Asset Table</title>
                    <style>
                        /* Add any styling as needed */
                        table {
                            border-collapse: collapse;
                            width: 100%;
                        }
                        th, td {
                            border: 1px solid black;
                            padding: 8px;
                            text-align: left;
                        }
                    </style>
                </head>
                <body>
                    <h1>Asset Table</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Asset ID</th>
                                <th>Asset Name</th>
                                <th>Asset Tag</th>
                                <th>Version History</th>
                                <th>Current Image</th>
                                <th>Model</th>
                                <th>Type</th>
                                <th>Asset Tag</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Purchase Date</th>
                                <th>Cost</th>
                                <th>Deployed</th>
                                <th>Member_ID</th>
                                <!-- Add more headers as needed -->
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows.join('')}
                        </tbody>
                    </table>
                </body>
            </html>
        `;

        return res.send(assetTable);
    });
});


app.get('/Member', (req, res) => {
    const sql = "SELECT * FROM Member";
    db.query(sql, (err, data) => {
        if(err) {
            console.error('Database query error:', err);
            return res.status(500).send('<p>Error retrieving data from the database</p>');
        }

        // Convert the data to an HTML table
        const tableRows = data.map(member => {
            return `<tr>
                        <td>${member.Member_ID}</td>
                        <td>${member.First_Name}</td>
                        <td>${member.Last_Name}</td>
                        <td>${member.Email}</td>
                        <td>${member.Phone}</td>
                        <!-- Add more columns as needed -->
                    </tr>`;
        });

        // Create the HTML table
        const memberTable = `
            <html>
                <head>
                    <title>Member Table</title>
                    <style>
                        /* Add any styling as needed */
                        table {
                            border-collapse: collapse;
                            width: 100%;
                        }
                        th, td {
                            border: 1px solid black;
                            padding: 8px;
                            text-align: left;
                        }
                    </style>
                </head>
                <body>
                    <h1>Member Table</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Member ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <!-- Add more headers as needed -->
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows.join('')}
                        </tbody>
                    </table>
                </body>
            </html>
        `;

        return res.send(memberTable);
    });
});

app.get('/Location', (req, res) => {
    const sql = "SELECT * FROM Location";
    db.query(sql, (err, data) => {
        if(err) {
            console.error('Database query error:', err);
            return res.status(500).send('<p>Error retrieving data from the database</p>');
        }

        // Convert the data to an HTML table
        const tableRows = data.map(location => {
            return `<tr>
                        <td>${location.Location_ID}</td>
                        <td>${location.Location_Name}</td>
                        <td>${location.Location_Description}</td>
                        <!-- Add more columns as needed -->
                    </tr>`;
        });

        // Create the HTML table
        const locationTable = `
            <html>
                <head>
                    <title>Location Table</title>
                    <style>
                        /* Add any styling as needed */
                        table {
                            border-collapse: collapse;
                            width: 100%;
                        }
                        th, td {
                            border: 1px solid black;
                            padding: 8px;
                            text-align: left;
                        }
                    </style>
                </head>
                <body>
                    <h1>Location Table</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Location ID</th>
                                <th>Location Name</th>
                                <th>Location Description</th>
                                <!-- Add more headers as needed -->
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows.join('')}
                        </tbody>
                    </table>
                </body>
            </html>
        `;

        return res.send(locationTable);
    });
});

app.get('/Accessory', (req, res) => {
    const sql = "SELECT * FROM Accessory";
    db.query(sql, (err, data) => {
        if(err) {
            console.error('Database query error:', err);
            return res.status(500).send('<p>Error retrieving data from the database</p>');
        }

        // Convert the data to an HTML table
        const tableRows = data.map(accessory => {
            return `<tr>
                        <td>${accessory.Accessory_ID}</td>
                        <td>${accessory.Accessory_Name}</td>
                        <td>${accessory.Accessory_Description}</td>
                        <!-- Add more columns as needed -->
                    </tr>`;
        });

        // Create the HTML table
        const accessoryTable = `
            <html>
                <head>
                    <title>Accessory Table</title>
                    <style>
                        /* Add any styling as needed */
                        table {
                            border-collapse: collapse;
                            width: 100%;
                        }
                        th, td {
                            border: 1px solid black;
                            padding: 8px;
                            text-align: left;
                        }
                    </style>
                </head>
                <body>
                    <h1>Accessory Table</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Accessory ID</th>
                                <th>Accessory Name</th>
                                <th>Accessory Description</th>
                                <!-- Add more headers as needed -->
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows.join('')}
                        </tbody>
                    </table>
                </body>
            </html>
        `;

        return res.send(accessoryTable);
    });
});
// Add more tables here when created.

// ******************************************************************************************
// FUNCTIONS CONNECTING FRONTEND TO BACKEND
// ******************************************************************************************

// Connection to frontend: This function takes input data from the form inside addAsset.html
// then adds a new asset to the database on the backend side.
app.post('/addAsset', (req, res) => {
    const formData = req.body; // Retrieve the entire form data object

    console.log("New Asset Added:", formData); // Verify if formData is received correctly

    const sql = `INSERT INTO Asset 
                (Asset_Name, Asset_Tag, VersionHistory, Current_Image, Model, Type, Category, Status, Purchase_Date, Cost, Deployed) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        formData.Asset_Name,
        formData.Asset_Tag,
        formData.VersionHistory,
        formData.Current_Image,
        formData.Model,
        formData.Type,
        formData.Category,
        formData.Status,
        formData.Purchase_Date,
        formData.Cost,
        formData.Deployed
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            //console.error('Database query error:', err); // Log the specific database query error
            return res.status(500).json({ error: 'Database query error' });
        }
        return res.status(200).json({ message: 'Asset added successfully' });
    });
    
});

app.delete('/deleteAsset/:id', (req, res) => {
    const assetID = req.params.id;
    const sql = "DELETE FROM Asset WHERE Asset_ID = ?";
    console.log("Asset Deleted:", assetID)

    db.query(sql, [assetID], (err, result) => {
        if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: 'Database query error' });
        }
        return res.status(200).json({ message: 'Asset deleted successfully' });
    });
});

// Update an asset based on its ID
app.put('/updateAsset/:id', (req, res) => {
    const assetID = req.params.id;
    const updatedAssetData = req.body; // Data sent from the frontend to update the asset

    const sql = `UPDATE Asset 
                SET 
                Asset_Name = ?,
                Asset_Tag = ?,
                VersionHistory = ?,
                Current_Image = ?,
                Model = ?,
                Type = ?,
                Category = ?,
                Status = ?,
                Purchase_Date = ?,
                Cost = ?,
                Deployed = ?
                WHERE Asset_ID = ?`;

    console.log("Asset Updated to:", updatedAssetData)

    const values = [
        updatedAssetData.Asset_Name,
        updatedAssetData.Asset_Tag,
        updatedAssetData.VersionHistory,
        updatedAssetData.Current_Image,
        updatedAssetData.Model,
        updatedAssetData.Type,
        updatedAssetData.Category,
        updatedAssetData.Status,
        updatedAssetData.Purchase_Date,
        updatedAssetData.Cost,
        updatedAssetData.Deployed,
        assetID // assetID to identify the asset to update
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        return res.status(200).json({ message: 'Asset updated successfully' });
    });
});

// Add a location
app.post('/addLocation', (req, res) => {
    const formData = req.body; // Retrieve the entire form data object

    console.log(formData); // Verify if formData is received correctly

    const sql = `INSERT INTO Location 
                (Name, Description, LocationType) 
                VALUES (?, ?, ?)`;

    const values = [
        formData.Name,
        formData.Description,
        formData.LocationType,
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            //console.error('Database query error:', err); // Log the specific database query error
            return res.status(500).json({ error: 'Database query error' });
        }
        return res.status(200).json({ message: 'Location added successfully' });
    });
    
});

// Add a new Member
app.post('/addMember', (req, res) => {
    const formData = req.body; // Retrieve the entire form data object

    console.log('New User Added:', formData); // Verify if formData is received correctly

    const sql = `INSERT INTO Member 
                (GD_id, Name, Permissions, Email, History, Department, Manager) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        formData.GD_id,
        formData.Name,
        formData.Permissions,
        formData.Email,
        formData.History,
        formData.Department,
        formData.Manager
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            //console.error('Database query error:', err); // Log the specific database query error
            return res.status(500).json({ error: 'Database query error' });
        }
        return res.status(200).json({ message: 'Member added successfully' });
    });
    
});

//Checkout an asset to a specific member
app.put('/checkoutAsset/:assetID/:memberID', (req, res) => {
    const assetID = req.params.assetID;
    const memberID = req.params.memberID;
  
    // Check if the memberID exists in the Members table
    const checkMemberExistenceQuery = 'SELECT * FROM Member WHERE GD_id = ?';
  
    db.query(checkMemberExistenceQuery, [memberID], (checkErr, checkResult) => {
      if (checkErr) {
        console.error('Database query error:', checkErr);
        return res.status(500).json({ error: 'Database query error' });
      }
  
      if (checkResult.length === 0) {
        // MemberID does not exist in the Members table
        console.log('MemberID does not exist, Asset was not checked out')
        return res.status(400).json({ error: 'MemberID does not exist' });
      }
  
      // If memberID exists, proceed with updating the Asset table
      const updateAssetQuery = 'UPDATE Asset SET Member_ID = ? WHERE Asset_ID = ?';
  
      db.query(updateAssetQuery, [memberID, assetID], (updateErr, updateResult) => {
        if (updateErr) {
          console.error('Database query error:', updateErr);
          return res.status(500).json({ error: 'Database query error' });
        }
        console.log('Asset Checked out to:', memberID)
        return res.status(200).json({ message: 'Asset checked out successfully' });
      });
    });
});

// Checkin a checked out Asset
app.put('/checkinAsset/:assetID', (req, res) => {
    const assetID = req.params.assetID;
  
    const sql = 'UPDATE Asset SET Member_ID = NULL WHERE Asset_ID = ?';
  
    db.query(sql, [assetID], (err, result) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: 'Database query error' });
      }
      console.log('Asset', assetID, 'succesfully checked in.')
      return res.status(200).json({ message: 'Asset checked in successfully' });
    });
});

// TODO: - Create functions for adding to locations table, members table, accessories table

// Listen on Port 8081
app.listen(port, ()=> {
    console.log("LISTENING")
})
