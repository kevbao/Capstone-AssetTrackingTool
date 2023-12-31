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
    database: 'asset_tracking'
})

app.get('/', (re, res) => {
    return res.json("This is our Database Server");
})

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
// Add more tables here when created.

// ******************************************************************************************
// FUNCTIONS CONNECTING FRONTEND TO BACKEND
// ******************************************************************************************

// Connection to frontend: This function takes input data from the form inside addAsset.html
// then adds a new asset to the database on the backend side.
app.post('/addAsset', (req, res) => {
    const formData = req.body; // Retrieve the entire form data object

    console.log(formData); // Verify if formData is received correctly

    const sql = `INSERT INTO Asset 
                (Asset_Name, Asset_Tag, VersionHistory, Current_Image, Model, Type, AssetTag, Category, Status, Purchase_Date, Cost, Deployed) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        formData.Asset_Name,
        formData.Asset_Tag,
        formData.VersionHistory,
        formData.Current_Image,
        formData.Model,
        formData.Type,
        formData.AssetTag,
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
// TODO: - Create functions for adding to locations table, members table, accessories table
//       - Create functions for deleting from all of them

// Listen on Port 8081
app.listen(port, ()=> {
    console.log("LISTENING")
})