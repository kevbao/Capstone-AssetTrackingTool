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
                    <li><a href="/History">View Activity</a></li>
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
        if(err) return res.json(err);
        return res.json(data);
    })
})


app.get('/Member', (req, res) => {
    const sql = "SELECT * FROM Member";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/Location', (req, res) => {
    const sql = "SELECT * FROM Location";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/Accessory', (req, res) => {
    const sql = "SELECT * FROM Accessory";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})


app.get('/History', (req, res) => {
    const sql = "SELECT * FROM History";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})
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
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
                (Name, GD_specific_location, Description, LocationType) 
                VALUES (?, ?, ?, ?)`;

    const values = [
        formData.Name,
        formData.GD_specific_location,
        formData.Description,
        formData.LocationType
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            //console.error('Database query error:', err); // Log the specific database query error
            return res.status(500).json({ error: 'Database query error' });
        }
        return res.status(200).json({ message: 'Location added successfully' });
    });
    
});

// Delete a location based on its ID
app.delete('/deleteLocation/:id', (req, res) => {
    const locationID = req.params.id;
    const sql = "DELETE FROM Location WHERE Location_id = ?";
    console.log("Location Deleted:", locationID)

    db.query(sql, [locationID], (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        return res.status(200).json({ message: 'Location deleted successfully' });
    });
});

// Update a location based on its ID
app.put('/updateLocation/:id', (req, res) => {
    const locationID = req.params.id;
    const updatedLocationData = req.body; // Data sent from the frontend to update the location

    const sql = `UPDATE Location 
                SET 
                Name = ?,
                GD_specific_location = ?,
                Description = ?,
                LocationType = ?
                WHERE Location_id = ?`;

    console.log("Location Updated to:", updatedLocationData)

    const values = [
        updatedLocationData.Name,
        updatedLocationData.GD_specific_location,
        updatedLocationData.Description,
        updatedLocationData.LocationType,
        locationID // locationID to identify the location to update
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        return res.status(200).json({ message: 'Location updated successfully' });
    });
});


// Add a new Member
app.post('/addMember', (req, res) => {
    const formData = req.body; // Retrieve the entire form data object

    console.log('New User Added:', formData); // Verify if formData is received correctly

    const sql = `INSERT INTO Member 
                (GD_id, Name, Permissions, Email, History, Department, Manager) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`;

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

// Delete a member based on its ID
app.delete('/deleteMember/:id', (req, res) => {
    const memberID = req.params.id;
    const sql = "DELETE FROM Member WHERE GD_id = ?";
    console.log("Member Deleted:", memberID)

    db.query(sql, [memberID], (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        return res.status(200).json({ message: 'Member deleted successfully' });
    });
});

// Update a member based on its ID
app.put('/updateMember/:id', (req, res) => {
    const memberID = req.params.id;
    const updatedMemberData = req.body; // Data sent from the frontend to update the member

    const sql = `UPDATE Member 
                SET 
                Name = ?,
                Permissions = ?,
                Email = ?,
                History = ?,
                Department = ?,
                Manager = ?
                WHERE GD_id = ?`;

    console.log("Member Updated to:", updatedMemberData)

    const values = [
        updatedMemberData.Name,
        updatedMemberData.Permissions,
        updatedMemberData.Email,
        updatedMemberData.History,
        updatedMemberData.Department,
        updatedMemberData.Manager,
        memberID // memberID to identify the member to update
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        return res.status(200).json({ message: 'Member updated successfully' });
    });
});

// Add an accessory
app.post('/addAccessory', (req, res) => {
    const formData = req.body; // Retrieve the entire form data object

    console.log("New Accessory Added:", formData); // Verify if formData is received correctly

    const sql = `INSERT INTO Accessory 
                (Name, Description, Category, Model, Total, numCheckedOut, cost) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        formData.Name,
        formData.Description,
        formData.Category,
        formData.Model,
        formData.Total,
        formData.numCheckedOut,
        formData.cost
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Database query error:', err); // Log the specific database query error
            return res.status(500).json({ error: 'Database query error' });
        }
        return res.status(200).json({ message: 'Accessory added successfully' });
    });
});

// Delete an accessory based on its ID
app.delete('/deleteAccessory/:id', (req, res) => {
    const accessoryID = req.params.id;
    const sql = "DELETE FROM Accessory WHERE Accessory_id = ?";
    console.log("Accessory Deleted:", accessoryID)

    db.query(sql, [accessoryID], (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        return res.status(200).json({ message: 'Accessory deleted successfully' });
    });
});

// Update an accessory based on its ID
app.put('/updateAccessory/:id', (req, res) => {
    const accessoryID = req.params.id;
    const updatedAccessoryData = req.body; // Data sent from the frontend to update the accessory

    const sql = `UPDATE Accessory 
                SET 
                Name = ?,
                Description = ?,
                Category = ?,
                Model = ?,
                Total = ?,
                numCheckedOut = ?,
                cost = ?
                WHERE Accessory_id = ?`;

    console.log("Accessory Updated to:", updatedAccessoryData)

    const values = [
        updatedAccessoryData.Name,
        updatedAccessoryData.Description,
        updatedAccessoryData.Category,
        updatedAccessoryData.Model,
        updatedAccessoryData.Total,
        updatedAccessoryData.numCheckedOut,
        updatedAccessoryData.cost,
        accessoryID // accessoryID to identify the accessory to update
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        return res.status(200).json({ message: 'Accessory updated successfully' });
    });
});

// Checkout an asset to a specific member with location
app.put('/checkoutAsset/:assetID/:memberName/:locationName', (req, res) => {
    const assetID = req.params.assetID;
    const memberName = req.params.memberName;
    const locationName = req.params.locationName;

    // Check if the memberName exists in the Members table
    const checkMemberExistenceQuery = 'SELECT GD_id FROM Member WHERE Name = ?';

    db.query(checkMemberExistenceQuery, [memberName], (checkErr, checkResult) => {
        if (checkErr) {
            console.error('Database query error:', checkErr);
            return res.status(500).json({ error: 'Database query error' });
        }

        if (checkResult.length === 0) {
            // Member with the specified name does not exist
            console.log('Member with the specified name does not exist');
            return res.status(400).json({ error: 'Member with the specified name does not exist' });
        }

        // Extract GD_id from the query result
        const memberID = checkResult[0].GD_id;

        // Fetch the location ID based on the provided location name
        const getLocationIDQuery = 'SELECT Location_id FROM Location WHERE Name = ?';

        db.query(getLocationIDQuery, [locationName], (locationErr, locationResult) => {
            if (locationErr) {
                console.error('Database query error:', locationErr);
                return res.status(500).json({ error: 'Database query error' });
            }

            if (locationResult.length === 0) {
                // Location with the specified name does not exist
                console.log('Location with the specified name does not exist');
                return res.status(400).json({ error: 'Location with the specified name does not exist' });
            }

            const locationID = locationResult[0].Location_id;

            // If memberName and locationName exist, proceed with updating the Asset table
            const updateAssetQuery = 'UPDATE Asset SET Member_ID = ?, Location_Name = ?, Status = "In Use" WHERE Asset_ID = ?';

            db.query(updateAssetQuery, [memberID, locationName, assetID], (updateErr, updateResult) => {
                if (updateErr) {
                    console.error('Database query error:', updateErr);
                    return res.status(500).json({ error: 'Database query error' });
                }

                // Fetch the name of the asset
                const fetchAssetNameQuery = 'SELECT Asset_Name FROM Asset WHERE Asset_ID = ?';
                db.query(fetchAssetNameQuery, [assetID], (fetchErr, fetchResult) => {
                    if (fetchErr) {
                        console.error('Database query error:', fetchErr);
                        return res.status(500).json({ error: 'Database query error' });
                    }

                    const assetName = fetchResult[0].Asset_Name;

                    // Insert into History table
                    const insertHistoryQuery = `
                        INSERT INTO History (Action_Description, DateTime)
                        VALUES ('${assetName} checked out to ${memberName} at ${locationName}', NOW())
                    `;

                    db.query(insertHistoryQuery, (historyErr, historyResult) => {
                        if (historyErr) {
                            console.error('Database query error:', historyErr);
                            return res.status(500).json({ error: 'Database query error' });
                        }

                        console.log('Asset checked out to:', memberName);
                        return res.status(200).json({ message: 'Asset checked out successfully' });
                    });
                });
            });
        });
    });
});

// Checkin a checked-out Asset
app.put('/checkinAsset/:assetID', (req, res) => {
    const assetID = req.params.assetID;

    // Update Asset table to set Member_ID to NULL and Location_Name to NULL, and Status to "Available"
    const updateAssetQuery = 'UPDATE Asset SET Member_ID = NULL, Location_Name = NULL, Status = "Available" WHERE Asset_ID = ?';

    db.query(updateAssetQuery, [assetID], (updateErr, updateResult) => {
        if (updateErr) {
            console.error('Database query error:', updateErr);
            return res.status(500).json({ error: 'Database query error' });
        }

        // Fetch the name of the asset
        const fetchAssetNameQuery = 'SELECT Asset_Name FROM Asset WHERE Asset_ID = ?';
        db.query(fetchAssetNameQuery, [assetID], (fetchErr, fetchResult) => {
            if (fetchErr) {
                console.error('Database query error:', fetchErr);
                return res.status(500).json({ error: 'Database query error' });
            }

            const assetName = fetchResult[0].Asset_Name;

            // Insert into History table
            const insertHistoryQuery = `
                INSERT INTO History (Action_Description, DateTime)
                VALUES ('${assetName} checked in', NOW())
            `;

            db.query(insertHistoryQuery, (historyErr, historyResult) => {
                if (historyErr) {
                    console.error('Database query error:', historyErr);
                    return res.status(500).json({ error: 'Database query error' });
                }

                console.log('Asset', assetName, 'successfully checked in.');
                return res.status(200).json({ message: 'Asset checked in successfully' });
            });
        });
    });
});


// Checkin a checked-out Asset
app.put('/checkinAsset/:assetID', (req, res) => {
    const assetID = req.params.assetID;

    // Update Asset table to set Member_ID to NULL and Location_Name to NULL
    const updateAssetQuery = 'UPDATE Asset SET Member_ID = NULL, Location_Name = NULL WHERE Asset_ID = ?';

    db.query(updateAssetQuery, [assetID], (updateErr, updateResult) => {
        if (updateErr) {
            console.error('Database query error:', updateErr);
            return res.status(500).json({ error: 'Database query error' });
        }

        // Fetch the name of the asset
        const fetchAssetNameQuery = 'SELECT Asset_Name FROM Asset WHERE Asset_ID = ?';
        db.query(fetchAssetNameQuery, [assetID], (fetchErr, fetchResult) => {
            if (fetchErr) {
                console.error('Database query error:', fetchErr);
                return res.status(500).json({ error: 'Database query error' });
            }

            const assetName = fetchResult[0].Asset_Name;

            // Insert into History table
            const insertHistoryQuery = `
                INSERT INTO History (Action_Description, DateTime)
                VALUES ('${assetName} checked in', NOW())
            `;

            db.query(insertHistoryQuery, (historyErr, historyResult) => {
                if (historyErr) {
                    console.error('Database query error:', historyErr);
                    return res.status(500).json({ error: 'Database query error' });
                }

                console.log('Asset', assetName, 'successfully checked in.');
                return res.status(200).json({ message: 'Asset checked in successfully' });
            });
        });
    });
});

// Listen on Port 8081
app.listen(port, ()=> {
    console.log("LISTENING")
})